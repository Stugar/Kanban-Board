import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task',
  imports: [SidebarComponent,NgIf,FormsModule,CommonModule],
  standalone: true,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  boardname: string | undefined;
  showForms: boolean = true;
  selectedColumn: string = '';  
  boardData: any = {};
  
  selectedPerson: string = localStorage.getItem('selectedPerson') || '';

  isModalOpen: boolean = false;
  taskName: string = '';
  taskDetail: string = '';
  editingTaskIndex:number |null =null;
  draggedTask: any;
  draggedColumn: any;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.boardname = params.get('boardName') || '';
      if (this.boardname) {
        const localData = localStorage.getItem('boards');
        if (localData) {
          const boards = JSON.parse(localData);
          this.boardData = boards.find((board: any) => board.boardName === this.boardname) || {};
          console.log(this.boardData);
        }
      }
    });
  }


  closeModal(): void {
    this.isModalOpen = false;
  }

  submitForms(): void {
    if (this.editingTaskIndex !== null) {
      this.boardData[this.selectedColumn][this.editingTaskIndex] = {
        name: this.taskName,
        detail: this.taskDetail,
        column: this.selectedColumn
      };
    } else {
      const newTask = {
        name: this.taskName,
        detail: this.taskDetail,
        column: this.selectedColumn
      };
      if (!this.boardData[this.selectedColumn]) {
        this.boardData[this.selectedColumn] = [];
      }
      this.boardData[this.selectedColumn].push(newTask);
    }
  
    this.saveToLocalStorage();
    this.closeModal();
  }
  

  openModal(column: string, index?: number): void {
    this.selectedColumn = column;
    this.editingTaskIndex = index !== undefined ? index : null;
  
    if (index !== undefined) {
      // แก้ไข Task ที่มีอยู่
      const task = this.boardData[column][index];
      this.taskName = task.name;
      this.taskDetail = task.detail;
    } else {
      // เพิ่ม Task ใหม่
      this.taskName = '';
      this.taskDetail = '';
    }
  
    this.isModalOpen = true;
  }
  
  
  deleteTask(column: string, index: number): void {
    this.boardData[column].splice(index, 1);
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    const localData = localStorage.getItem('boards');
    if (localData) {
      const boards = JSON.parse(localData);
      const boardIndex = boards.findIndex((board: any) => board.boardName === this.boardname);
      if (boardIndex !== -1) {
        boards[boardIndex] = this.boardData;
        localStorage.setItem('boards', JSON.stringify(boards));
      }
    }
  }

  onDragStart(event: DragEvent, task: any, column: string): void {
    this.draggedTask = task;
    this.draggedColumn = column;
    event.dataTransfer?.setData('text', task?.name); 
  }


  

  // drop
  onDrop(event: DragEvent, targetColumn: string): void {
    event.preventDefault();
    if (this.draggedTask) {

      this.boardData[targetColumn].push(this.draggedTask);

      const oldColumn = this.draggedColumn;
      const index = this.boardData[oldColumn].indexOf(this.draggedTask);
      if (index > -1) {
        this.boardData[oldColumn].splice(index, 1);
      }

      this.saveToLocalStorage();
      this.draggedTask = null;
    }
  }

onDragOver(event: DragEvent): void {
    event.preventDefault(); 
  }
  
  onDragEnd(event: DragEvent): void {
    this.draggedTask = null; 
  }

  showPopup() {
    Swal.fire({
      title: 'เลือกคน',
      input: 'select',
      inputOptions: {
        'earth': 'earth',
        'pp': 'pp',
        '่jo': 'jo'
      },
      inputPlaceholder: '...',
      showCancelButton: true,
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก'
    }).then(result => {
      if (result.isConfirmed) {
        this.selectedPerson = result.value;
        localStorage.setItem('selectedPerson', this.selectedPerson); // เก็บข้อมูลลงใน localStorage
      }
    });
  }

  
}