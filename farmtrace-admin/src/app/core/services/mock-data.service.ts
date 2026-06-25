// =============================================
// MockDataService — FarmTrace Admin Portal
// Provides fake data for all features while
// the Spring Boot backend is being developed.
// When the backend is ready, we simply swap
// these mock calls for real HTTP calls.
// =============================================

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// ── Data shapes (models) ──────────────────────

// The shape of the dashboard summary stats
export interface DashboardSummary {
  totalClerks: number;
  totalCooperatives: number;
  approvedFarmers: number;
  pendingFarmers: number;
  rejectedFarmers: number;
  unverifiedFarmers: number;
}

// The shape of a single clerk
export interface Clerk {
  id: string;
  fullName: string;
  email: string;
  region: string;
  cooperativeName: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
}

// The shape of a single cooperative
export interface Cooperative {
  id: string;
  name: string;
  region: string;
  farmerCount: number;
  clerkCount: number;
  createdAt: string;
}

// The shape of a single farmer
export interface Farmer {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  region: string;
  cooperativeName: string;
  status: 'UNVERIFIED' | 'PENDING' | 'APPROVED' | 'REJECTED';
  cropType: string;
  registeredAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  // ── Mock dashboard summary ──────────────────

  getDashboardSummary(): Observable<DashboardSummary> {
    return of({
      totalClerks: 12,
      totalCooperatives: 8,
      approvedFarmers: 340,
      pendingFarmers: 14,
      rejectedFarmers: 8,
      unverifiedFarmers: 6
    });
  }

  // ── Mock clerks list ────────────────────────

  getClerks(): Observable<Clerk[]> {
    return of([
      {
        id: 'c-001',
        fullName: 'Jane Mwangi',
        email: 'jane@farmtrace.co',
        region: 'Central',
        cooperativeName: 'Kiambu Tea SACCO',
        status: 'ACTIVE',
        createdAt: '2025-01-10'
      },
      {
        id: 'c-002',
        fullName: 'David Otieno',
        email: 'david@farmtrace.co',
        region: 'Rift Valley',
        cooperativeName: 'Nakuru Wheat Growers',
        status: 'ACTIVE',
        createdAt: '2025-02-14'
      },
      {
        id: 'c-003',
        fullName: 'Mary Njeru',
        email: 'mary@farmtrace.co',
        region: 'Eastern',
        cooperativeName: 'Meru Coffee Growers',
        status: 'ACTIVE',
        createdAt: '2025-03-05'
      },
      {
        id: 'c-004',
        fullName: 'Samuel Kariuki',
        email: 'sam@farmtrace.co',
        region: 'Nyanza',
        cooperativeName: 'Kisumu Rice Farmers',
        status: 'ACTIVE',
        createdAt: '2025-03-20'
      },
      {
        id: 'c-005',
        fullName: 'Grace Wambui',
        email: 'grace@farmtrace.co',
        region: 'Western',
        cooperativeName: 'Kakamega Sugar Cane SACCO',
        status: 'ACTIVE',
        createdAt: '2025-04-01'
      }
    ]);
  }

  // ── Mock cooperatives list ──────────────────

  getCooperatives(): Observable<Cooperative[]> {
    return of([
      {
        id: 'co-001',
        name: 'Kiambu Tea SACCO',
        region: 'Central',
        farmerCount: 87,
        clerkCount: 3,
        createdAt: '2024-11-01'
      },
      {
        id: 'co-002',
        name: 'Meru Coffee Growers',
        region: 'Eastern',
        farmerCount: 54,
        clerkCount: 2,
        createdAt: '2024-11-15'
      },
      {
        id: 'co-003',
        name: 'Nakuru Wheat Growers',
        region: 'Rift Valley',
        farmerCount: 63,
        clerkCount: 2,
        createdAt: '2024-12-01'
      },
      {
        id: 'co-004',
        name: 'Kisumu Rice Farmers',
        region: 'Nyanza',
        farmerCount: 48,
        clerkCount: 2,
        createdAt: '2024-12-20'
      },
      {
        id: 'co-005',
        name: 'Kakamega Sugar Cane SACCO',
        region: 'Western',
        farmerCount: 72,
        clerkCount: 3,
        createdAt: '2025-01-05'
      }
    ]);
  }

  // ── Mock farmers list ───────────────────────

  getFarmers(): Observable<Farmer[]> {
    return of([
      {
        id: 'f-001',
        fullName: 'John Kamau',
        email: 'john@gmail.com',
        phone: '0712345678',
        region: 'Central',
        cooperativeName: 'Kiambu Tea SACCO',
        status: 'APPROVED',
        cropType: 'Tea',
        registeredAt: '2025-01-20'
      },
      {
        id: 'f-002',
        fullName: 'Alice Achieng',
        email: 'alice@gmail.com',
        phone: '0723456789',
        region: 'Nyanza',
        cooperativeName: 'Kisumu Rice Farmers',
        status: 'PENDING',
        cropType: 'Rice',
        registeredAt: '2025-05-10'
      },
      {
        id: 'f-003',
        fullName: 'Peter Mutua',
        email: 'peter@gmail.com',
        phone: '0734567890',
        region: 'Eastern',
        cooperativeName: 'Meru Coffee Growers',
        status: 'PENDING',
        cropType: 'Coffee',
        registeredAt: '2025-05-12'
      },
      {
        id: 'f-004',
        fullName: 'Rose Chebet',
        email: 'rose@gmail.com',
        phone: '0745678901',
        region: 'Rift Valley',
        cooperativeName: 'Nakuru Wheat Growers',
        status: 'APPROVED',
        cropType: 'Wheat',
        registeredAt: '2025-02-28'
      },
      {
        id: 'f-005',
        fullName: 'James Omondi',
        email: 'james@gmail.com',
        phone: '0756789012',
        region: 'Nyanza',
        cooperativeName: 'Kisumu Rice Farmers',
        status: 'REJECTED',
        cropType: 'Rice',
        registeredAt: '2025-03-15'
      }
    ]);
  }
}