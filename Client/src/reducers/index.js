import { combineReducers } from 'redux';

import { users } from './users.reducer';
import { authentication } from './authentication.reducer';
import { posts } from './posts.reducer';

const rootReducer = combineReducers({ users, authentication, posts });

export default rootReducer;