import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme'

configure({ adapter: new Adapter() });

const mockApi = {
  data: {
    restaurants: [
      {
        name: 'Test Restaurant',
        image_url: 'https://www.opentable.com/img/restimages/21307.jpg',
        address: '123 King',
        price: 4
      }
    ]
  }
}

const priceZero = {
  data: {
    restaurants: [
      {
        name: 'Test Restaurant',
        image_url: 'https://www.opentable.com/img/restimages/21307.jpg',
        address: '123 King',
        price: 0
      }
    ]
  }
}



describe('<App />', function () {
  it('should render without crashing', () => {
    const app = shallow(<App />)
    const header = <h1>Top Restaurants</h1>
    const results = <h2>Results for Toronto</h2>
    expect(app.contains(results)).toEqual(true)
    expect(app.contains(header)).toEqual(true)
    app.unmount()
  });
})

describe('intToDollarSign', function () {
  beforeEach(() => {
    this.app = shallow(<App />)
  })

  afterEach(() => {
    this.app.unmount()
  })

  it('should not render if price is undefined or 0', () => {
    expect(this.app.find('.restaurants')).toHaveLength(0)

    this.app.setState(priceZero)
    expect(this.app.find('.price')).toHaveLength(0)
  });

  it('should render a number of dollar signs equal to the price state', () => {
    expect(this.app.find('.restaurants')).toHaveLength(0)

    this.app.setState(mockApi)
    const four = <p className='price'>$$$$</p>
    expect(this.app.contains(four)).toEqual(true)
    expect(this.app.find('.restaurants')).toHaveLength(1)
  });
})

