// =============================================
// MockDataService — FarmTrace Admin Portal
// Single source of truth for all mock data.
// Data is stored in memory so that when you
// add or delete items on any page, the changes
// are reflected everywhere including the right
// panel stats. When the real backend is ready,
// this entire service gets replaced with real
// HTTP calls — nothing else changes.
// =============================================

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// ── Data shapes (models) ──────────────────────

export interface DashboardSummary {
  totalClerks: number;
  totalCooperatives: number;
  approvedFarmers: number;
  pendingFarmers: number;
  rejectedFarmers: number;
  unverifiedFarmers: number;
}

export interface Clerk {
  id: string;
  fullName: string;
  email: string;
  region: string;
  cooperativeName: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
}

export interface Cooperative {
  id: string;
  name: string;
  region: string;
  cropType?: string;
  farmerCount: number;
  clerkCount: number;
  createdAt: string;
}

export interface Farmer {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  region: string;
  cooperativeName: string;
  cooperativeId: string;
  status: 'UNVERIFIED' | 'PENDING' | 'APPROVED' | 'REJECTED';
  cropType: string;
  registeredAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  // ── In-memory data store ──────────────────────
  // All pages share these same lists so that
  // adding or deleting on one page updates all

  private clerks: Clerk[] = [
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
  ];

  private cooperatives: Cooperative[] = [
    {
      id: 'co-001',
      name: 'Kiambu Tea SACCO',
      region: 'Central',
      cropType: 'Tea',
      farmerCount: 87,
      clerkCount: 1,
      createdAt: '2024-11-01'
    },
    {
      id: 'co-002',
      name: 'Meru Coffee Growers',
      region: 'Eastern',
      cropType: 'Coffee',
      farmerCount: 54,
      clerkCount: 1,
      createdAt: '2024-11-15'
    },
    {
      id: 'co-003',
      name: 'Nakuru Wheat Growers',
      region: 'Rift Valley',
      cropType: 'Wheat',
      farmerCount: 63,
      clerkCount: 1,
      createdAt: '2024-12-01'
    },
    {
      id: 'co-004',
      name: 'Kisumu Rice Farmers',
      region: 'Nyanza',
      cropType: 'Rice',
      farmerCount: 48,
      clerkCount: 1,
      createdAt: '2024-12-20'
    },
    {
      id: 'co-005',
      name: 'Kakamega Sugar Cane SACCO',
      region: 'Western',
      cropType: 'Sugar Cane',
      farmerCount: 72,
      clerkCount: 1,
      createdAt: '2025-01-05'
    }
  ];

  private farmers: Farmer[] = [
    {
      id: 'f-001',
      fullName: 'John Kamau',
      email: 'john@gmail.com',
      phone: '0712345678',
      region: 'Central',
      cooperativeName: 'Kiambu Tea SACCO',
      cooperativeId: 'co-001',
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
      cooperativeId: 'co-004',
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
      cooperativeId: 'co-002',
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
      cooperativeId: 'co-003',
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
      cooperativeId: 'co-004',
      status: 'REJECTED',
      cropType: 'Rice',
      registeredAt: '2025-03-15'
    },
    {
      id: 'f-006',
      fullName: 'Lucy Wanjiru',
      email: 'lucy@gmail.com',
      phone: '0767890123',
      region: 'Central',
      cooperativeName: 'Kiambu Tea SACCO',
      cooperativeId: 'co-001',
      status: 'APPROVED',
      cropType: 'Tea',
      registeredAt: '2025-02-10'
    },
    {
      id: 'f-007',
      fullName: 'Brian Onyango',
      email: 'brian@gmail.com',
      phone: '0778901234',
      region: 'Western',
      cooperativeName: 'Kakamega Sugar Cane SACCO',
      cooperativeId: 'co-005',
      status: 'PENDING',
      cropType: 'Sugar Cane',
      registeredAt: '2025-05-18'
    }
  ];

  // ── Dashboard Summary ─────────────────────────
  // Always calculated from actual data so it
  // stays accurate when items are added or deleted

  getDashboardSummary(): Observable<DashboardSummary> {
    return of(this.calculateSummary());
  }

  // Calculate summary from the actual in-memory data
  private calculateSummary(): DashboardSummary {
    return {
      totalClerks: this.clerks.length,
      totalCooperatives: this.cooperatives.length,
      approvedFarmers: this.farmers.filter(
        f => f.status === 'APPROVED'
      ).length,
      pendingFarmers: this.farmers.filter(
        f => f.status === 'PENDING'
      ).length,
      rejectedFarmers: this.farmers.filter(
        f => f.status === 'REJECTED'
      ).length,
      unverifiedFarmers: this.farmers.filter(
        f => f.status === 'UNVERIFIED'
      ).length
    };
  }

  // ── Clerks CRUD ───────────────────────────────

  getClerks(): Observable<Clerk[]> {
    return of([...this.clerks]);
  }

  addClerk(clerk: Clerk): Observable<Clerk> {
    this.clerks.unshift(clerk);
    // Update clerk count in the cooperative
    const coop = this.cooperatives.find(
      c => c.name === clerk.cooperativeName
    );
    if (coop) coop.clerkCount++;
    return of(clerk);
  }

  deleteClerk(id: string): Observable<boolean> {
    const clerk = this.clerks.find(c => c.id === id);
    if (clerk) {
      // Update clerk count in the cooperative
      const coop = this.cooperatives.find(
        c => c.name === clerk.cooperativeName
      );
      if (coop && coop.clerkCount > 0) coop.clerkCount--;
    }
    this.clerks = this.clerks.filter(c => c.id !== id);
    return of(true);
  }

  // ── Cooperatives CRUD ─────────────────────────

  getCooperatives(): Observable<Cooperative[]> {
    return of([...this.cooperatives]);
  }

  addCooperative(cooperative: Cooperative): Observable<Cooperative> {
    this.cooperatives.unshift(cooperative);
    return of(cooperative);
  }

  deleteCooperative(id: string): Observable<boolean> {
    this.cooperatives = this.cooperatives.filter(c => c.id !== id);
    return of(true);
  }

  // Get a single cooperative by ID
  getCooperativeById(id: string): Observable<Cooperative | undefined> {
    return of(this.cooperatives.find(c => c.id === id));
  }

  // ── Farmers ───────────────────────────────────

  getFarmers(): Observable<Farmer[]> {
    return of([...this.farmers]);
  }

  // Get farmers belonging to a specific cooperative
  getFarmersByCooperative(cooperativeId: string): Observable<Farmer[]> {
    return of(
      this.farmers.filter(f => f.cooperativeId === cooperativeId)
    );
  }

  // Get clerks belonging to a specific cooperative
  getClerksByCooperative(cooperativeName: string): Observable<Clerk[]> {
    return of(
      this.clerks.filter(c => c.cooperativeName === cooperativeName)
    );
  }
}