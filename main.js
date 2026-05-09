document.addEventListener('DOMContentLoaded', () => {
    // Selectors
    const voteBtns = document.querySelectorAll('.vote-btn');
    const popdowns = document.querySelectorAll('.district-popdown');
    const totalVotesDisplay = document.getElementById('total-votes-display');
    
    const districts = [
        "Thiruvananthapuram", "Kollam", "Pathanamthitta", "Alappuzha", 
        "Kottayam", "Idukki", "Ernakulam", "Thrissur", "Palakkad", 
        "Malappuram", "Kozhikode", "Wayanad", "Kannur", "Kasaragod"
    ];

    // Helper: Animate numeric values
    function animateValue(obj, start, end, duration) {
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

    const handleVote = (candidate, district) => {
        // Record Vote
        localStorage.setItem('voxkerala_voted', 'true');
        localStorage.setItem('voxkerala_district', district);
        localStorage.setItem('voxkerala_candidate', candidate);

        // Update Total Votes UI
        if (totalVotesDisplay) {
            const currentTotal = parseInt(totalVotesDisplay.textContent.replace(/,/g, ''));
            animateValue(totalVotesDisplay, currentTotal, currentTotal + 1, 1000);
        }

        // Success State
        setTimeout(() => {
            checkVoteStatus();
            alert(`Success! Your vote for ${candidate} from ${district} has been recorded.`);
        }, 300);
    };

    const checkVoteStatus = () => {
        const hasVoted = localStorage.getItem('voxkerala_voted');
        if (hasVoted) {
            voteBtns.forEach(btn => {
                btn.innerHTML = '<span class="material-symbols-outlined text-[18px]">check_circle</span> VOTED';
                btn.classList.add('opacity-50', 'cursor-not-allowed', 'pointer-events-none');
                btn.disabled = true;
            });
            popdowns.forEach(p => p.remove());
        }
    };

    // Toggle Popdowns
    voteBtns.forEach((btn, idx) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            // Close other popdowns
            popdowns.forEach((p, pIdx) => {
                if (pIdx !== idx) p.classList.add('hidden');
            });
            // Toggle current
            popdowns[idx].classList.toggle('hidden');
        });
    });

    // Close on click outside
    document.addEventListener('click', () => {
        popdowns.forEach(p => p.classList.add('hidden'));
    });

    checkVoteStatus();
});
