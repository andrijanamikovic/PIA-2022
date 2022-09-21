import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../model/book';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';
  login(usernameFromForm, passwordFromForm) {
    const data = {
      username: usernameFromForm,
      password: passwordFromForm
    }

    return this.http.post(`${this.uri}/users/login`, data)
  }

  loginAdmin(usernameFromForm, passwordFromForm) {
    const data = {
      username: usernameFromForm,
      password: passwordFromForm
    }

    return this.http.post(`${this.uri}/users/adminlogin`, data)
  }


  register(firstname, lastname, username, password, address, phone, email, photo, type){
    const data = {
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password,
      type: 0,
      address:address,
      phone: phone,
      email: email,
      photo: photo,
      taken: 0,
      blocked: false
    }
    return this.http.post(`${this.uri}/users/register`, data);

  }

  changePassword(currentUser, newPassoword) {
    const data = {
      User: currentUser,
      newPassoword: newPassoword
    }

    return this.http.post(`${this.uri}/users/changePassword`, data)
  }

  getAll() {
    return this.http.get(`${this.uri}/users/getAll`);
  }

  delete(user){
    const data = {
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      password: user.password,
      type: user.type,
      address:user.address,
      phone: user.phone,
      email: user.email,
      photo: user.photo,
      taken: user.taken
    }
    return this.http.post(`${this.uri}/users/delete`, data)
  }

  edit(user) {
    const data = {
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      password: user.password,
      type: user.type,
      address:user.address,
      phone: user.phone,
      email: user.email,
      photo: user.photo,
      taken: user.taken
    }

    return this.http.post(`${this.uri}/users/edit`, data)
  }

  block(user, block){
    const data = {
      username: user.username,
      block : block
    }
    console.log(data);

    return this.http.post(`${this.uri}/users/block`, data)
  }

  addBook(book: Book, current: User){
    // console.log(book);
    const data = {
      user: current.username,
      title: book.title,
      subtitle: book.subtitle,
      author: book.author,
      published: book.published,
      publisher: book.publisher,
      genre: book.genre,
      language: book.language,
      amount: book.amount,
      photo:book.photo
    }
    return this.http.post(`${this.uri}/book/addBookUser`, data);

  }

  getAllPadding(){
    return this.http.get(`${this.uri}/book/paddingRequest`);
  }

  approve(_id){
    const data = {
      _id: _id
    }
    return this.http.post(`${this.uri}/book/approve`, data);
   
  }

  decline(_id){
    const data = {
      _id: _id
    }
    return this.http.post(`${this.uri}/book/decline`, data);
  }
}