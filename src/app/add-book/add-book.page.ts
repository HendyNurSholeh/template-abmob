import { Component, OnInit } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.page.html',
  styleUrls: ['./add-book.page.scss'],
})
export class AddBookPage implements OnInit {
  newBook = { title: ' ', description: ' ', cover: 'boruto.jpg' };
  private apiUrl = 'http://192.168.43.40/collection-book-api/';
  constructor() {}

  ngOnInit() {}

  async addBook() {
    console.log(this.newBook);
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
}
