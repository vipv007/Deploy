import { Component } from '@angular/core';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-imageupload1',
  templateUrl: 'imageupload1.page.html',
  styleUrls: ['imageupload1.page.scss'],
})
export class Imageupload1Page {
  uploadError: any;
  selectedFile: File;

  constructor(private imageService: ImageService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // async uploadSelectedImage() {
  //   try {
  //     if (!this.selectedFile) {
  //       console.error('No file selected for upload');
  //       return;
  //     }

  //     // Convert selected file to base64
  //     const base64Image = await this.convertFileToBase64(this.selectedFile);

  //     // Upload base64-encoded image
  //     await this.imageService.uploadImage(base64Image);
  //     console.log('Image uploaded successfully');
  //     this.uploadError = null;
  //   } catch (error) {
  //     console.error('Error uploading image:', error);
  //     this.uploadError = error;
  //   }
  // }

  private convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        resolve(base64String.split(',')[1]); // Extract only the base64 data
      };
      reader.onerror = () => {
        reject(new Error('Error reading file'));
      };
      reader.readAsDataURL(file);
    });
  }
}
