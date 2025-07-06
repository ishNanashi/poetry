import { Component, Input } from '@angular/core';
import { Poem } from './poem.interface';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-poem',
  imports: [CommonModule, MatDividerModule,],
  templateUrl: './poem.html',
  styleUrl: './poem.scss'
})
export class PoemComponent {
  @Input() poem: Poem | null = null;
}
