// =============================================
// RegionCount Pipe — FarmTrace Admin Portal
// Takes a list of cooperatives and a region name
// and returns how many cooperatives are in
// that region. Used in the cooperatives page
// to show the regions breakdown.
// =============================================

import { Pipe, PipeTransform } from '@angular/core';
import { Cooperative } from '../../core/services/mock-data.service';

@Pipe({
  name: 'regionCount',
  standalone: true
})
export class RegionCountPipe implements PipeTransform {

  transform(cooperatives: Cooperative[], region: string): number {
    // Count how many cooperatives belong to this region
    return cooperatives.filter(
      coop => coop.region === region
    ).length;
  }
}