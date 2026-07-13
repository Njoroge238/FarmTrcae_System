// =============================================
// Reports Component — FarmTrace Admin Portal
// System wide analytics and reports page.
// =============================================

import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MockDataService, Farmer, Cooperative } from '../../core/services/mock-data.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent implements OnInit, AfterViewInit {

  @ViewChild('statusChart') statusChartRef!: ElementRef;
  @ViewChild('coopChart') coopChartRef!: ElementRef;
  @ViewChild('cropChart') cropChartRef!: ElementRef;
  @ViewChild('trendChart') trendChartRef!: ElementRef;

  statusChart: Chart | null = null;
  coopChart: Chart | null = null;
  cropChart: Chart | null = null;
  trendChart: Chart | null = null;

  farmers: Farmer[] = [];
  cooperatives: Cooperative[] = [];
  isLoading = true;

  totalFarmers = 0;
  approvedFarmers = 0;
  pendingFarmers = 0;
  rejectedFarmers = 0;

  constructor(private mockDataService: MockDataService) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {}

  loadData(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.mockDataService.getFarmers().subscribe(farmers => {
        this.farmers = farmers;
        this.totalFarmers = farmers.length;
        this.approvedFarmers = farmers.filter(f => f.status === 'APPROVED').length;
        this.pendingFarmers = farmers.filter(f => f.status === 'PENDING').length;
        this.rejectedFarmers = farmers.filter(f => f.status === 'REJECTED').length;

        this.mockDataService.getCooperatives().subscribe(coops => {
          this.cooperatives = coops;
          this.isLoading = false;
          setTimeout(() => this.buildCharts(), 100);
        });
      });
    }, 600);
  }

  buildCharts(): void {
    this.buildStatusChart();
    this.buildCoopChart();
    this.buildCropChart();
    this.buildTrendChart();
  }

  buildStatusChart(): void {
    if (!this.statusChartRef) return;
    if (this.statusChart) this.statusChart.destroy();

    const approved = this.farmers.filter(f => f.status === 'APPROVED').length;
    const pending = this.farmers.filter(f => f.status === 'PENDING').length;
    const rejected = this.farmers.filter(f => f.status === 'REJECTED').length;
    const unverified = this.farmers.filter(f => f.status === 'UNVERIFIED').length;

    this.statusChart = new Chart(this.statusChartRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Approved', 'Pending', 'Rejected', 'Unverified'],
        datasets: [{
          data: [approved, pending, rejected, unverified],
          backgroundColor: ['#3b6d11', '#ba7517', '#a32d2d', '#9ca3af'],
          borderWidth: 0,
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 16,
              font: { size: 12 },
              usePointStyle: true,
              pointStyleWidth: 8
            }
          }
        }
      }
    });
  }

  buildCoopChart(): void {
    if (!this.coopChartRef) return;
    if (this.coopChart) this.coopChart.destroy();

    const labels = this.cooperatives.map(c =>
      c.name.length > 20 ? c.name.substring(0, 20) + '...' : c.name
    );
    const data = this.cooperatives.map(c => c.farmerCount);

    this.coopChart = new Chart(this.coopChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Farmers',
          data,
          backgroundColor: '#185fa5',
          borderRadius: 6,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: '#f3f4f6' }, ticks: { font: { size: 11 } } },
          y: { grid: { display: false }, ticks: { font: { size: 11 } } }
        }
      }
    });
  }

  buildCropChart(): void {
    if (!this.cropChartRef) return;
    if (this.cropChart) this.cropChart.destroy();

    const cropMap: Record<string, number> = {};
    this.farmers.forEach(f => {
      cropMap[f.cropType] = (cropMap[f.cropType] || 0) + 1;
    });

    const labels = Object.keys(cropMap);
    const data = Object.values(cropMap);
    const colors = ['#185fa5', '#3b6d11', '#ba7517', '#a32d2d', '#6b7280', '#0f6e56'];

    this.cropChart = new Chart(this.cropChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Farmers',
          data,
          backgroundColor: colors.slice(0, labels.length),
          borderRadius: 6,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 11 } } },
          y: { grid: { color: '#f3f4f6' }, ticks: { font: { size: 11 }, stepSize: 1 } }
        }
      }
    });
  }

  buildTrendChart(): void {
    if (!this.trendChartRef) return;
    if (this.trendChart) this.trendChart.destroy();

    const months = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    const data = [8, 14, 11, 19, 24, 18];

    this.trendChart = new Chart(this.trendChartRef.nativeElement, {
      type: 'line',
      data: {
        labels: months,
        datasets: [{
          label: 'New registrations',
          data,
          borderColor: '#185fa5',
          backgroundColor: 'rgba(24, 95, 165, 0.08)',
          borderWidth: 2,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#185fa5',
          pointRadius: 4,
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 11 } } },
          y: { grid: { color: '#f3f4f6' }, ticks: { font: { size: 11 }, stepSize: 5 } }
        }
      }
    });
  }
}