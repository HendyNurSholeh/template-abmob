import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CapacitorHttp } from '@capacitor/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  newBook = { id: '', title: '', description: '', cover: '' };
  books: any[];
  private apiUrl = 'http://192.168.43.40/collection-book-api/';

  constructor(private router: Router) {
    this.books = [];
  }

  ngOnInit() {
    // Panggil fungsi untuk mendapatkan data dari API
    this.fetchDataFromApi();
  }

  async fetchDataFromApi() {
    const options = {
      url: this.apiUrl + 'get-data.php',
      headers: { 'Content-Type': 'application/json' },
    };

    console.log('Fetching data from API');

    try {
      const response = await CapacitorHttp.request({
        ...options,
        method: 'GET', // Use GET method for fetching data
      });
      this.books = response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async addBook() {
    try {
      const response = await CapacitorHttp.request({
        url: `${this.apiUrl}send-data.php`,
        method: 'POST',
        data: this.newBook,
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('Book added successfully:', response.data);
    } catch (error) {
      console.error('Error adding book:', error);
    }
  }

  onFileChange(event: any) {
    const fileInput = event.target;
    const files = fileInput.files;

    if (files && files.length > 0) {
      const file = files[0];
      this.newBook.cover = file.name;

      // You can also upload the file or perform other actions here
    } else {
      console.error('No file selected.');
    }
  }

  goToDetailsView(id_book: string) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        id: id_book,
      },
    };

    this.router.navigate(['/detail-book'], navigationExtras);
  }

  cutText(text: string, charCount: number): string {
    if (!text) {
      return ''; // Handle jika deskripsi null atau undefined
    }

    if (text.length > charCount) {
      return text.slice(0, charCount) + '...';
    }

    return text;
  }
}
