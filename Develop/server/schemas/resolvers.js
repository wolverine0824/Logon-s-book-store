// This is bringing in the AuthenticationError, User thoughts, and signToken  
const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // we can retrieve the logged in user without specifically searching for them, just by adding context to our query
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })

        return userData
      }
      // this error lets you now you need to login
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    // this mutation adds a user to the database with username, email, password
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      console.log("userFormData", user)
      return { token, user };
    },
    // this is logging in user from there email and password
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

    // if there is no user found this is the error message
      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }
      // this makes sure that users password is correct
      const correctPw = await user.isCorrectPassword(password);

      // if password is incorrect, this is the error message
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (parent, { bookId, authors, description, image, link, title}, context) => {
      if (context.user) {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { 
          $addToSet: { 
            savedBooks: { bookId, authors, description, image, link, title },
          }, 
        },
        {
           new: true, 
          runValidators: true,
        }
      )
        return updatedUser
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeBook: async (parent, {bookId }, context) => {
      if (context.user) {
        // this finds a logged in user in the database and remove the book from their saved books
        return updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $pull: {
              savedBooks: { bookId }} 
          },
          { new: true }
        );

      }
      // if not logged in, this is the error message
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
