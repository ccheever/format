let { gql } = require('apollo-server-express');

module.exports = gql`
  type Query {
    answerToLife: Int
  }
`;
