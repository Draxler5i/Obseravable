import React, { Component } from 'react';
import { Observable } from 'rxjs';
import axios from 'axios';

class SimpleGet extends Component {
  state = {
    usersAsync: null,
    usersPromise: null,
    usersObs: null
  }

  componentDidMount = () => {
    this.getUsersAsync();
    this.getUsersPromise();
    this.getUsersObserver();
  }

  getUsersAsync = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const users = await response.json();
      this.setState({ usersAsync: users });
    } catch (err) {
      console.log(`Error getUsers: ${err}`);
    }
  }

  getUsersPromise = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then( res => res.json())
      .then( users => {
        this.setState({
          usersPromise: users
        })
      });
  }

  getUsersObserver = () => {
    let observable$ = Observable.create( async observer => {
      axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
          observer.next(response.data);
          observer.complete();
        })
        .catch(err => observer.error(err));
    });

    observable$.subscribe({
      next: data => {
        console.log('[data] => ', data);
        this.setState({ usersObs: data });
      },
      complete: data => console.log('[complete]'),
    });

    // setTimeout( () => {
    //   subscription.unsubscribe();
    // });
  }

  render() {
    const { usersAsync, usersPromise, usersObs } = this.state;
    return (
      <div>
        {usersAsync && usersAsync.map(({ name, email }) => <p key={name + email}>{name} - {email}</p>)}
        {usersObs && usersObs.map(({ name, email }) => <h5 key={name}>{name} - {email}</h5>)}
        {usersPromise && usersPromise.map(({ id, name, email }) => <p key={id}>{id}.- {name} - {email}</p>)}
      </div>
    );
  }
}

export default SimpleGet;