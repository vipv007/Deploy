import { Component, OnInit } from '@angular/core';
import { TimesheetService } from '../services/timesheet.service';

@Component({
  selector: 'app-sal',
  templateUrl: './sal.page.html',
  styleUrls: ['./sal.page.scss'],
})
export class SalPage implements OnInit {

  worklogData: any[] = [];
  totalWorkingHours: number = 0;
  calculatedSalary: number = 0;
  selectedName: string = '';
  filteredWorklogData: any[] = [];
  uniqueNames: string[] = [];

  constructor(private timesheetService: TimesheetService) {}

  ngOnInit(): void {
    this.fetchWorklogEntries();
  }

  fetchWorklogEntries(): void {
    this.timesheetService.getWorklogEntries().subscribe(
      (entries: any[]) => {
        this.worklogData = entries.slice(0, 31);
        this.updateUniqueNames(); // Update unique names when data is fetched
        this.filterEntries(); // Initial filter when data is fetched
      },
      error => {
        console.error('Error fetching entries:', error);
      }
    );
  }

  updateUniqueNames(): void {
    // Extract unique names from worklogData
    const uniqueNamesSet = new Set<string>(this.worklogData.map(entry => entry.name));
    this.uniqueNames = Array.from(uniqueNamesSet);
  }

  addEntry(): void {
    const newEntry = {
      date: '',
      name: '',
      checkIn: '',
      checkOut: '',
      totalHours: '',
      description: '',
    };
    this.worklogData.unshift(newEntry);
    this.filterEntries(); // Update filtered entries when a new entry is added
  }

  saveEntries(): void {
    this.filterEntries(); // Update filtered entries before saving
    this.calculateTotalHours(); // Recalculate total hours for filtered entries

    const entriesToInsert = this.worklogData.filter(entry => entry.date.trim() !== '');
    this.timesheetService.addWorklogEntries(entriesToInsert).subscribe(
      response => {
        console.log('Entries added successfully:', response);
        this.clearForm();
        this.fetchWorklogEntries();
      },
      error => {
        console.error('Error adding entries:', error);
      }
    );
  }

  
  calculateTotalHours(): void {
    this.totalWorkingHours = 0;

    // Calculate total hours only for the filtered entries
    this.filteredWorklogData.forEach(entry => {
      if (entry.totalHours !== '' && !isNaN(parseFloat(entry.totalHours))) {
        this.totalWorkingHours += parseFloat(entry.totalHours);
      }
    });

    // Calculate salary based on the total working hours and a fixed rate (51.28 rs per hour)
    this.calculatedSalary = this.totalWorkingHours * 51.28;
  }

  filterEntries(): void {
    this.updateUniqueNames(); // Update unique names when entries are filtered

    if (this.selectedName) {
      this.filteredWorklogData = this.worklogData.filter(entry => entry.name === this.selectedName);
    } else {
      this.filteredWorklogData = this.worklogData;
    }

    this.calculateTotalHours(); // Recalculate total hours when entries are filtered
  }

  clearForm(): void {
    this.worklogData.forEach(entry => {
      entry.date = '';
      entry.name = '';
      entry.checkIn = '';
      entry.checkOut = '';
      entry.totalHours = '';
      entry.description = '';
    });
  }
}
