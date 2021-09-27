import { gql } from '@apollo/client';
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, 
  $email: String!, $password: String!) {
    addUser(username: $username, 
    email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook(
  $BookId: String!, $Authors: String!, 
  $Description: String!, $Title: String!, 
  $Image: String!, $Link: String!) {
    saveBook(BookId: $bookId, 
    Author: $Authors, 
    Description: $Description, 
    Title: $Title, Image: $Image) {
      _id
      username
      email
      saveBook {
      BookId
      authors
      description
      image
      link
      title
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: string!) {
   removeBook(bookId: $bookId) {
    _id
      username 
      email
      saveBook {
      BookId
      authors
      description
      image
      link
      title
      }
    }
  }
`;
