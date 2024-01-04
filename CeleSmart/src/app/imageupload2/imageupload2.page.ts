 // image-upload.page.ts
import { Component, OnInit } from '@angular/core';
import { ImagesService, Image } from '../services/images.service';

@Component({
  selector: 'app-imageupload2',
  templateUrl: 'imageupload2.page.html',
  styleUrls: ['imageupload2.page.scss'],
})
export class Imageupload2Page implements OnInit {
  images: Image[] = [];

  constructor(private imagesService: ImagesService) {}

  ngOnInit() {
    this.loadImages();
  }

  async loadImages() {
    try {
      this.images = await this.imagesService.getAllImages();
    } catch (error) {
      console.error('Error loading images:', error);
    }
  }
}
