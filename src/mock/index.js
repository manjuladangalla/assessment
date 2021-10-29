import { createServer } from 'miragejs';

import data from './data.json';

createServer({
  routes() {
    this.namespace = 'api';

    this.get('/posts', () => {
      return data;
    });
    this.get("/posts/:id", (schema, request) => {
      console.log(request.params.id)
      let return_post = null;
      data.posts.map((post) => {
        if (post.id === request.params.id){
          return_post = post
        }
      })
      return return_post
    })
  },
});
