import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gygssejpjvelcvkipfrq.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5Z3NzZWpwanZlbGN2a2lwZnJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzMjYzMTcsImV4cCI6MjA5MzkwMjMxN30.7iskwVbdnu3h4NtnPJw1SSBKWiIqnkVImnV_31LOKOM'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
    console.log('Testing connection to:', supabaseUrl)
    const { data, error } = await supabase.from('votes').select('*').limit(1)
    if (error) {
        console.error('Connection Error:', error.message)
        if (error.message.includes('Invalid API key')) {
            console.log('TIP: Check if there are any hidden characters or if the key was copied partially.')
        }
    } else {
        console.log('Connection Successful! Data:', data)
    }
}

testConnection()
