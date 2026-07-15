// =============================================
// Export Service — FarmTrace Admin Portal
// Handles exporting data as CSV files that
// the admin can open in Excel or Google Sheets.
// Works with mock data now — real API later.
// =============================================

import { Injectable } from '@angular/core';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor(private mockDataService: MockDataService) {}

  // -----------------------------------------------
  // Core CSV download helper
  // Converts data array to CSV and triggers download
  // -----------------------------------------------
  private downloadCSV(data: object[], filename: string): void {
    if (data.length === 0) return;

    // Get column headers from the first object's keys
    const headers = Object.keys(data[0]);

    // Build CSV rows
    const csvRows = [
      headers.join(','), // header row
      ...data.map(row =>
        headers.map(header => {
          const value = (row as Record<string, unknown>)[header];
          // Wrap values in quotes to handle commas inside values
          return `"${value ?? ''}"`;
        }).join(',')
      )
    ];

    // Create a blob and trigger the download
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  // -----------------------------------------------
  // Export dashboard summary as CSV
  // -----------------------------------------------
  exportDashboardSummary(): void {
    this.mockDataService.getDashboardSummary().subscribe(summary => {
      const data = [{
        'Total Clerks': summary.totalClerks,
        'Total Cooperatives': summary.totalCooperatives,
        'Approved Farmers': summary.approvedFarmers,
        'Pending Farmers': summary.pendingFarmers,
        'Rejected Farmers': summary.rejectedFarmers,
        'Unverified Farmers': summary.unverifiedFarmers
      }];
      this.downloadCSV(data, 'farmtrace_dashboard_summary');
    });
  }

  // -----------------------------------------------
  // Export all clerks as CSV
  // -----------------------------------------------
  exportClerks(): void {
    this.mockDataService.getClerks().subscribe(clerks => {
      const data = clerks.map(c => ({
        'Full Name': c.fullName,
        'Email': c.email,
        'Region': c.region,
        'Cooperative': c.cooperativeName,
        'Status': c.status,
        'Created At': c.createdAt
      }));
      this.downloadCSV(data, 'farmtrace_clerks');
    });
  }

  // -----------------------------------------------
  // Export all cooperatives as CSV
  // -----------------------------------------------
  exportCooperatives(): void {
    this.mockDataService.getCooperatives().subscribe(coops => {
      const data = coops.map(c => ({
        'Name': c.name,
        'Region': c.region,
        'Crop Type': c.cropType || 'Mixed',
        'Farmer Count': c.farmerCount,
        'Clerk Count': c.clerkCount,
        'Created At': c.createdAt
      }));
      this.downloadCSV(data, 'farmtrace_cooperatives');
    });
  }

  // -----------------------------------------------
  // Export all farmers as CSV
  // -----------------------------------------------
  exportFarmers(): void {
    this.mockDataService.getFarmers().subscribe(farmers => {
      const data = farmers.map(f => ({
        'Full Name': f.fullName,
        'Email': f.email,
        'Phone': f.phone,
        'Region': f.region,
        'Cooperative': f.cooperativeName,
        'Crop Type': f.cropType,
        'Status': f.status,
        'Registered At': f.registeredAt
      }));
      this.downloadCSV(data, 'farmtrace_farmers');
    });
  }

  // -----------------------------------------------
  // Export reports summary as CSV
  // -----------------------------------------------
  exportReports(): void {
    this.mockDataService.getFarmers().subscribe(farmers => {
      const data = farmers.map(f => ({
        'Farmer Name': f.fullName,
        'Cooperative': f.cooperativeName,
        'Region': f.region,
        'Crop Type': f.cropType,
        'Status': f.status,
        'Registered At': f.registeredAt
      }));
      this.downloadCSV(data, 'farmtrace_reports');
    });
  }
}