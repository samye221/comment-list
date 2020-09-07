import React from 'react';
import { createMemoryHistory, createLocation } from 'history';
import CommentList from './CommentList';
import renderer from 'react-test-renderer'

const match = {
    isExact: false,
    url: "/",
    params: { id: "1" }
};
const history = createMemoryHistory();
const location = createLocation(match.url);

it('renders correctly',() => { 
    const tree = renderer.create(<CommentList history={history} location={location}/>).toJSON()
    expect(tree).toMatchSnapshot()
})