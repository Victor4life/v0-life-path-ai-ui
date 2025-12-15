-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table (links to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  language TEXT DEFAULT 'en',
  theme_color TEXT DEFAULT 'purple',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create assessments table
CREATE TABLE IF NOT EXISTS public.assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  assessment_data JSONB NOT NULL,
  transcription TEXT,
  clarity_summary TEXT,
  emotional_state TEXT,
  root_causes JSONB,
  strengths JSONB,
  priority_actions JSONB,
  raw_analysis TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create plans table
CREATE TABLE IF NOT EXISTS public.plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  assessment_id UUID REFERENCES public.assessments(id) ON DELETE CASCADE,
  weekly_goals JSONB NOT NULL,
  daily_tasks JSONB NOT NULL,
  habits_to_build JSONB,
  habits_to_break JSONB,
  motivation_message TEXT,
  future_self_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create progress table
CREATE TABLE IF NOT EXISTS public.progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES public.plans(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL CHECK (day_number >= 1 AND day_number <= 30),
  completed BOOLEAN DEFAULT FALSE,
  notes TEXT,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(plan_id, day_number)
);

-- Create journal entries table
CREATE TABLE IF NOT EXISTS public.journal_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  entry_text TEXT NOT NULL,
  emotional_tone TEXT,
  patterns JSONB,
  insights TEXT,
  advice TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_delete_own" ON public.profiles FOR DELETE USING (auth.uid() = id);

-- Assessments policies
CREATE POLICY "assessments_select_own" ON public.assessments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "assessments_insert_own" ON public.assessments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "assessments_update_own" ON public.assessments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "assessments_delete_own" ON public.assessments FOR DELETE USING (auth.uid() = user_id);

-- Plans policies
CREATE POLICY "plans_select_own" ON public.plans FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "plans_insert_own" ON public.plans FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "plans_update_own" ON public.plans FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "plans_delete_own" ON public.plans FOR DELETE USING (auth.uid() = user_id);

-- Progress policies
CREATE POLICY "progress_select_own" ON public.progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "progress_insert_own" ON public.progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "progress_update_own" ON public.progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "progress_delete_own" ON public.progress FOR DELETE USING (auth.uid() = user_id);

-- Journal entries policies
CREATE POLICY "journal_entries_select_own" ON public.journal_entries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "journal_entries_insert_own" ON public.journal_entries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "journal_entries_update_own" ON public.journal_entries FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "journal_entries_delete_own" ON public.journal_entries FOR DELETE USING (auth.uid() = user_id);
