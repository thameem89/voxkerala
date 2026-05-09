# Supabase Database Setup

To make the VoxKerala live poll functional, follow these steps in your Supabase dashboard:

## 1. Create the `votes` Table
Go to the **SQL Editor** in your Supabase dashboard and run the following script:

```sql
-- Create the votes table
create table public.votes (
  id uuid default gen_random_uuid() primary key,
  candidate_name text not null,
  district text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable real-time for the votes table
alter publication supabase_realtime add table votes;

-- Enable Row Level Security (RLS)
alter table public.votes enable row level security;

-- Create a policy to allow anyone to insert a vote (Public Voting)
create policy "Allow public voting"
on public.votes
for insert
with check (true);

-- Create a policy to allow anyone to read votes (Live Dashboard)
create policy "Allow public read"
on public.votes
for select
using (true);
```

## 2. Get your API Keys
1. Go to **Project Settings** -> **API**.
2. Copy the **Project URL**.
3. Copy the **anon / public** Key.

## 3. Configure the App
Create a `.env` file in the root of your project:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

---

## What this does:
- **`votes` Table**: Stores every individual vote with the candidate and district.
- **Real-time**: Enables Supabase to "broadcast" new votes to your website instantly.
- **RLS Policies**: Ensures the database is secure while still allowing public users to participate.
