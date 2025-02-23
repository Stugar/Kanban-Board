import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';
import { StorageService } from '../service/storage.service';

import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [NgIf,FormsModule,CommonModule],
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  boards: any[] = []; 
  showForms = false;
  isModalOpen = false;

  boardName: string = '';
  column1: string = '';
  column2: string = '';
  column3: string = '';
  column4: string = '';

  userData: string | null = null;

  constructor(private router: Router,private storageService: StorageService,@Inject(PLATFORM_ID) private platformId: object,private location: Location) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      
      // 🔹 ถ้าไม่มี Token ให้ Redirect กลับไปหน้า Login ทันที
      if (!token) {
        this.router.navigate(['/login']);
        return;
      }

    if (isPlatformBrowser(this.platformId)) {
      const savedData = JSON.parse(localStorage.getItem('boards') || '[]');
      console.log(savedData);
      this.boards = savedData;
    } else {
      this.boards = []; // ถ้าอยู่บน Server ให้ใช้ค่าเริ่มต้น
    }
    
    if (typeof window !== 'undefined') {
      const savedData = JSON.parse(localStorage.getItem('boards') || '[]');
      console.log(savedData);
      this.boards = savedData;
    } else {
      this.boards = []; // กำหนดค่าเริ่มต้นเมื่อไม่มี localStorage
    }
  }
    

 
  }
  
  

  openModal() {
    console.log("test btn"); 
    this.isModalOpen = true;
    this.showForms = true;  
}

  

  closeModal() {
    this.isModalOpen = false;
    this.showForms = false;
  }

  submitForms() {

    if (!this.boardName || !this.column1 || !this.column2 || !this.column3 || !this.column4) {
      alert("Please fill in all columns before submitting!");
      return;
    }

    const formData = {
      boardName: this.boardName,
      column1: this.column1,
      column2: this.column2,
      column3: this.column3,
      column4: this.column4
    };


    const savedData = JSON.parse(localStorage.getItem('boards') || '[]');
    savedData.push(formData); 
    localStorage.setItem('boards', JSON.stringify(savedData));
    this.boards = savedData;
    this.closeModal();
  }
  
 //btn ไปหน้าอื่นนนนนนนน
 goToTask(boardName: string) {
  this.router.navigate(['/task', boardName]);
}


//edit ต่างๆ
editBoard(index: number): void {
  this.boards[index].isEditing = true;
  localStorage.setItem('boards', JSON.stringify(this.boards)); 
}

saveBoard(index: number): void {
  this.boards[index].isEditing = false;
  localStorage.setItem('boards', JSON.stringify(this.boards)); 

}

deleteBoard(index: number): void {
  this.boards.splice(index, 1); 
  localStorage.setItem('boards', JSON.stringify(this.boards)); 
  this.router.navigate(['/sidebar']);
}


// logout
logout() {
  localStorage.removeItem('token'); // ลบ token ออกจาก localStorage
  this.router.navigate(['/login']);  // เปลี่ยนเส้นทางไปหน้า Login
}
}
