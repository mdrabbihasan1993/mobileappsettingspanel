
import React from 'react';
import { 
  Building2, 
  User, 
  Truck, 
  CreditCard, 
  Landmark, 
  Smartphone,
  Sparkles
} from 'lucide-react';
import { SectionType } from './types';

export const DIVISIONS = ["Dhaka", "Chittagong", "Rajshahi", "Khulna", "Barisal", "Sylhet", "Rangpur", "Mymensingh"];

export const DISTRICTS: Record<string, string[]> = {
  "Dhaka": ["Dhaka City", "Gazipur", "Narayanganj", "Savar", "Manikganj", "Munshiganj", "Narsingdi"],
  "Chittagong": ["Chittagong City", "Cox's Bazar", "Feni", "Cumilla", "Brahmanbaria", "Chandpur", "Noakhali"],
  "Rajshahi": ["Rajshahi City", "Bogra", "Pabna", "Naogaon", "Natore"],
  "Khulna": ["Khulna City", "Jashore", "Kushtia", "Satkhira", "Bagerhat"],
  "Barisal": ["Barisal City", "Bhola", "Patuakhali", "Pirojpur"],
  "Sylhet": ["Sylhet City", "Moulvibazar", "Habiganj", "Sunamganj"],
  "Rangpur": ["Rangpur City", "Dinajpur", "Gaibandha", "Kurigram"],
  "Mymensingh": ["Mymensingh City", "Sherpur", "Jamalpur", "Netrokona"]
};

export const AREAS: Record<string, string[]> = {
  "Dhaka City": ["Uttara", "Gulshan", "Banani", "Dhanmondi", "Mirpur", "Mohammadpur", "Badda", "Motijheel"],
  "Gazipur": ["Tongi", "Gazipur Sadar", "Konabari", "Chowrasta"],
  "Chittagong City": ["Agrabad", "GEC", "Pahartali", "Halishahar", "Chawkbazar"],
  "Cox's Bazar": ["Kolatoli", "Laboni", "Sadar", "Teknaf"],
  // Add fallback for others
  "default": ["Main Town", "Suburbs", "Central Area", "Industrial Zone"]
};

export const NAVIGATION_ITEMS = [
  { id: 'business' as SectionType, label: 'Business Information', icon: <Building2 className="w-5 h-5" /> },
  { id: 'owner' as SectionType, label: 'Owner Information', icon: <User className="w-5 h-5" /> },
  { id: 'pickup' as SectionType, label: 'Pickup Method', icon: <Truck className="w-5 h-5" /> },
  { id: 'payment' as SectionType, label: 'Payment Method', icon: <CreditCard className="w-5 h-5" /> },
  { id: 'bank' as SectionType, label: 'Bank Account', icon: <Landmark className="w-5 h-5" /> },
  { id: 'mfs' as SectionType, label: 'MFS Account', icon: <Smartphone className="w-5 h-5" /> },
  { id: 'ai-assistant' as SectionType, label: 'AI Business Consultant', icon: <Sparkles className="w-5 h-5 text-brand-orange" /> },
];
