// =============================================
// Audit Log Component — FarmTrace Admin Portal
// Shows a log of all significant actions taken
// in the system — who did what and when.
// =============================================

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Shape of a single audit log entry
interface AuditEntry {
  id: string;
  action: string;
  actionType: 'CREATE' | 'DELETE' | 'APPROVE' | 'REJECT' | 'LOGIN';
  performedBy: string;
  targetEntity: string;
  details: string;
  timestamp: string;
}

@Component({
  selector: 'app-audit-log',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './audit-log.component.html',
  styleUrl: './audit-log.component.scss'
})
export class AuditLogComponent implements OnInit {

  // All audit log entries
  allEntries: AuditEntry[] = [];

  // Entries shown after filter
  filteredEntries: AuditEntry[] = [];

  // Controls the loading spinner
  isLoading = true;

  // Active filter
  activeFilter: 'ALL' | 'CREATE' | 'DELETE' | 'APPROVE' | 'REJECT' | 'LOGIN' = 'ALL';

  // Search query
  searchQuery = '';

  // Filter tabs
  filterTabs = [
    { label: 'All',     value: 'ALL'    as const },
    { label: 'Create',  value: 'CREATE' as const },
    { label: 'Delete',  value: 'DELETE' as const },
    { label: 'Approve', value: 'APPROVE'as const },
    { label: 'Reject',  value: 'REJECT' as const },
    { label: 'Login',   value: 'LOGIN'  as const }
  ];

  // Mock audit log entries
  private mockEntries: AuditEntry[] = [
    {
      id: 'a-001',
      action: 'CREATE_CLERK',
      actionType: 'CREATE',
      performedBy: 'admin@farmtrace.co',
      targetEntity: 'CLERK',
      details: 'Created clerk account for Jane Mwangi (jane@farmtrace.co)',
      timestamp: '2025-06-10T14:32:00Z'
    },
    {
      id: 'a-002',
      action: 'CREATE_COOPERATIVE',
      actionType: 'CREATE',
      performedBy: 'admin@farmtrace.co',
      targetEntity: 'COOPERATIVE',
      details: 'Created cooperative: Kiambu Tea SACCO in Central region',
      timestamp: '2025-06-10T13:15:00Z'
    },
    {
      id: 'a-003',
      action: 'APPROVE_FARMER',
      actionType: 'APPROVE',
      performedBy: 'jane@farmtrace.co',
      targetEntity: 'FARMER',
      details: 'Approved farmer registration for John Kamau',
      timestamp: '2025-06-09T11:20:00Z'
    },
    {
      id: 'a-004',
      action: 'REJECT_FARMER',
      actionType: 'REJECT',
      performedBy: 'david@farmtrace.co',
      targetEntity: 'FARMER',
      details: 'Rejected farmer registration for James Omondi — incomplete documents',
      timestamp: '2025-06-09T10:45:00Z'
    },
    {
      id: 'a-005',
      action: 'ADMIN_LOGIN',
      actionType: 'LOGIN',
      performedBy: 'admin@farmtrace.co',
      targetEntity: 'SYSTEM',
      details: 'Admin logged in successfully',
      timestamp: '2025-06-09T09:00:00Z'
    },
    {
      id: 'a-006',
      action: 'CREATE_CLERK',
      actionType: 'CREATE',
      performedBy: 'admin@farmtrace.co',
      targetEntity: 'CLERK',
      details: 'Created clerk account for David Otieno (david@farmtrace.co)',
      timestamp: '2025-06-08T16:30:00Z'
    },
    {
      id: 'a-007',
      action: 'DELETE_CLERK',
      actionType: 'DELETE',
      performedBy: 'admin@farmtrace.co',
      targetEntity: 'CLERK',
      details: 'Deleted clerk account for Tom Waweru (tom@farmtrace.co)',
      timestamp: '2025-06-08T15:00:00Z'
    },
    {
      id: 'a-008',
      action: 'APPROVE_FARMER',
      actionType: 'APPROVE',
      performedBy: 'mary@farmtrace.co',
      targetEntity: 'FARMER',
      details: 'Approved farmer registration for Rose Chebet',
      timestamp: '2025-06-07T14:10:00Z'
    },
    {
      id: 'a-009',
      action: 'CREATE_COOPERATIVE',
      actionType: 'CREATE',
      performedBy: 'admin@farmtrace.co',
      targetEntity: 'COOPERATIVE',
      details: 'Created cooperative: Meru Coffee Growers in Eastern region',
      timestamp: '2025-06-07T10:00:00Z'
    },
    {
      id: 'a-010',
      action: 'DELETE_COOPERATIVE',
      actionType: 'DELETE',
      performedBy: 'admin@farmtrace.co',
      targetEntity: 'COOPERATIVE',
      details: 'Deleted cooperative: Old Tea Growers SACCO',
      timestamp: '2025-06-06T09:30:00Z'
    },
    {
      id: 'a-011',
      action: 'ADMIN_LOGIN',
      actionType: 'LOGIN',
      performedBy: 'admin@farmtrace.co',
      targetEntity: 'SYSTEM',
      details: 'Admin logged in successfully',
      timestamp: '2025-06-06T08:00:00Z'
    },
    {
      id: 'a-012',
      action: 'APPROVE_FARMER',
      actionType: 'APPROVE',
      performedBy: 'jane@farmtrace.co',
      targetEntity: 'FARMER',
      details: 'Approved farmer registration for Lucy Wanjiru',
      timestamp: '2025-06-05T13:45:00Z'
    }
  ];

  ngOnInit(): void {
    this.loadEntries();
  }

  // -----------------------------------------------
  // Load audit log entries
  // -----------------------------------------------
  loadEntries(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.allEntries = this.mockEntries;
      this.applyFilters();
      this.isLoading = false;
    }, 600);
  }

  // -----------------------------------------------
  // Apply filter and search
  // -----------------------------------------------
  applyFilters(): void {
    let result = this.allEntries;

    if (this.activeFilter !== 'ALL') {
      result = result.filter(e => e.actionType === this.activeFilter);
    }

    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      result = result.filter(e =>
        e.details.toLowerCase().includes(query) ||
        e.performedBy.toLowerCase().includes(query) ||
        e.targetEntity.toLowerCase().includes(query)
      );
    }

    this.filteredEntries = result;
  }

  // -----------------------------------------------
  // Set active filter tab
  // -----------------------------------------------
  setFilter(filter: typeof this.activeFilter): void {
    this.activeFilter = filter;
    this.applyFilters();
  }

  // -----------------------------------------------
  // Handle search input
  // -----------------------------------------------
  onSearch(event: Event): void {
    this.searchQuery = (event.target as HTMLInputElement).value;
    this.applyFilters();
  }

  // -----------------------------------------------
  // Get icon for action type
  // -----------------------------------------------
  getActionIcon(type: string): string {
    const map: Record<string, string> = {
      'CREATE':  'add_circle',
      'DELETE':  'delete',
      'APPROVE': 'check_circle',
      'REJECT':  'cancel',
      'LOGIN':   'login'
    };
    return map[type] || 'info';
  }

  // -----------------------------------------------
  // Get CSS class for action type
  // -----------------------------------------------
  getActionClass(type: string): string {
    const map: Record<string, string> = {
      'CREATE':  'action-create',
      'DELETE':  'action-delete',
      'APPROVE': 'action-approve',
      'REJECT':  'action-reject',
      'LOGIN':   'action-login'
    };
    return map[type] || 'action-login';
  }

  // -----------------------------------------------
  // Get count for a specific action type
  // -----------------------------------------------
  getCount(type: string): number {
    if (type === 'ALL') return this.allEntries.length;
    return this.allEntries.filter(e => e.actionType === type).length;
  }
}