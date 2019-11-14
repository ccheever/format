let { gql } = require('apollo-server-express');

module.exports = gql`
  type Query {
    answerToLife: Int
  }

  type User {
      userId: ID!
      name: String
      emails: [Email]
  }

  interface Contact {

  }

  type Email implements Contact {

  }

  type Org {
      orgId: ID!
  }

  type Pub {
      pubId: ID!
  }

  type Post {
      postId: ID!
      blocks: [Block]
      createdTime: DateTime
      updatedTime: DateTime
      publishedTime: DateTime
      collaborators: [User]
      publications: [Pub]
  }

  type Block {
      blockId: ID!

  }

  type Mutation {

  }


`;
