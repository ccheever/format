let { gql } = require('apollo-server-express');

module.exports = gql`
  scalar DateTime

  type Query {
    answerToLife: Int
    user(userId: ID!): User
  }


  type User {
    userId: ID!
    name: String
    emails: [Email]
  }

  type Email {
    email: String
    primary: Boolean
    verified: Boolean
    receivesNotifications: Boolean
    undeliverable: Boolean
    visible: Boolean
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
`;
