import { createClient } from '@supabase/supabase-js'

// Initialize Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabase = (supabaseUrl && supabaseAnonKey) 
    ? createClient(supabaseUrl, supabaseAnonKey) 
    : null;

document.addEventListener('DOMContentLoaded', () => {
    // Selectors
    const voteBtns = document.querySelectorAll('.vote-btn');
    const popdowns = document.querySelectorAll('.district-popdown');
    const totalVotesDisplay = document.getElementById('total-votes-display');
    const resultsBars = document.getElementById('results-bars');
    const districtBreakdown = document.getElementById('district-breakdown');
    
    const districts = [
        "Thiruvananthapuram", "Kollam", "Pathanamthitta", "Alappuzha", 
        "Kottayam", "Idukki", "Ernakulam", "Thrissur", "Palakkad", 
        "Malappuram", "Kozhikode", "Wayanad", "Kannur", "Kasaragod"
    ];

    let currentVotes = [];

    // Helper: Animate numeric values
    function animateValue(obj, start, end, duration) {
        if (!obj) return;
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            obj.innerHTML = value.toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Initialize Popdowns
    popdowns.forEach(popdown => {
        const listContainer = popdown.querySelector('.grid');
        districts.forEach(d => {
            const btn = document.createElement('button');
            btn.className = "district-opt group flex items-center justify-between p-2 rounded hover:bg-[#2ecc71]/20 transition-all text-left w-full";
            btn.innerHTML = `<span class="text-[11px] text-white/70 group-hover:text-white">${d}</span>`;
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                handleVote(popdown.closest('.candidate-card').querySelector('h3').textContent, d);
                popdown.classList.add('hidden');
            });
            listContainer.appendChild(btn);
        });
    });

    // Handle the voting process
    const handleVote = async (candidate, district) => {
        if (!supabase) {
            console.error("Supabase not configured. Vote saved locally only.");
            saveLocalVote(candidate, district);
            return;
        }

        try {
            const { error } = await supabase
                .from('votes')
                .insert([{ candidate_name: candidate, district: district }]);
            
            if (error) throw error;

            // Mark as voted locally
            localStorage.setItem('voxkerala_voted', 'true');
            localStorage.setItem('voxkerala_district', district);
            localStorage.setItem('voxkerala_candidate', candidate);

            setTimeout(() => {
                checkVoteStatus();
                alert(`Success! Your vote for ${candidate} from ${district} has been recorded.`);
            }, 300);

        } catch (error) {
            console.error("Error casting vote:", error.message);
            alert("Database connection error. Please check your Supabase configuration.");
        }
    };

    const saveLocalVote = (candidate, district) => {
        localStorage.setItem('voxkerala_voted', 'true');
        alert("Supabase is not configured. This vote is only saved in your browser.");
        checkVoteStatus();
    };

    // Update UI with real data
    const updateDashboard = (votes) => {
        if (!votes) return;
        
        const total = votes.length;
        if (totalVotesDisplay) {
            const prevTotal = parseInt(totalVotesDisplay.textContent.replace(/,/g, '')) || 0;
            animateValue(totalVotesDisplay, prevTotal, total, 1000);
        }

        // Calculate Candidate Results
        const candidates = ["KC Venugopal", "VD Satheesan", "Ramesh Chennithala"];
        const candidateStats = candidates.map(name => {
            const count = votes.filter(v => v.candidate_name === name).length;
            return { name, count, percent: total > 0 ? Math.round((count / total) * 100) : 0 };
        });

        // Update Results Bars
        const barContainers = resultsBars.querySelectorAll('.space-y-2');
        candidateStats.forEach((stat, idx) => {
            if (barContainers[idx]) {
                const percentLabel = barContainers[idx].querySelector('.vote-percent');
                const fill = barContainers[idx].querySelector('.progress-fill');
                if (percentLabel) percentLabel.textContent = `${stat.percent}%`;
                if (fill) fill.style.width = `${stat.percent}%`;
            }
        });

        // Update Regional Breakdown (Top 3)
        const districtCounts = {};
        votes.forEach(v => {
            districtCounts[v.district] = (districtCounts[v.district] || 0) + 1;
        });

        const sortedDistricts = Object.entries(districtCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3);

        if (districtBreakdown) {
            districtBreakdown.innerHTML = sortedDistricts.map(([name, count]) => `
                <div class="flex justify-between items-center text-[11px] animate-in fade-in slide-in-from-left-2 duration-500">
                    <span class="text-white/60">${name}</span>
                    <span class="font-bold text-[#2ecc71]">${count.toLocaleString()}</span>
                </div>
            `).join('') || '<p class="text-white/20 text-[10px] text-center">Waiting for regional data...</p>';
        }
    };

    // Real-time Subscription
    const setupRealtime = () => {
        if (!supabase) return;

        supabase
            .channel('public:votes')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'votes' }, payload => {
                currentVotes.push(payload.new);
                updateDashboard(currentVotes);
            })
            .subscribe();
    };

    // Initial Data Fetch
    const fetchInitialData = async () => {
        if (!supabase) return;

        const { data, error } = await supabase
            .from('votes')
            .select('*');

        if (error) {
            console.error("Error fetching votes:", error.message);
            return;
        }

        currentVotes = data;
        updateDashboard(currentVotes);
        setupRealtime();
    };

    const checkVoteStatus = () => {
        const hasVoted = localStorage.getItem('voxkerala_voted');
        if (hasVoted) {
            voteBtns.forEach(btn => {
                btn.innerHTML = '<span class="material-symbols-outlined text-[18px]">check_circle</span> VOTED';
                btn.classList.add('opacity-50', 'cursor-not-allowed', 'pointer-events-none');
                btn.disabled = true;
            });
            popdowns.forEach(p => p.classList.add('hidden'));
        }
    };

    // Toggle Popdowns
    voteBtns.forEach((btn, idx) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            popdowns.forEach((p, pIdx) => {
                if (pIdx !== idx) p.classList.add('hidden');
            });
            popdowns[idx].classList.toggle('hidden');
        });
    });

    document.addEventListener('click', () => {
        popdowns.forEach(p => p.classList.add('hidden'));
    });

    fetchInitialData();
    checkVoteStatus();
});
