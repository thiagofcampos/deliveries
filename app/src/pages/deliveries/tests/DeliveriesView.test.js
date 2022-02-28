import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import DeliveriesView from '../DeliveriesView';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('DeliveriesView', () => {

    const deliveriesMock = [
        {
            id: "1",
            client: "Quigley Inc",
            customer: {
                name: "Clyde Bosco",
                address: "8459 Koss Skyway",
                city: "Waukegan",
                zipCode: 19087,
                latitude: 36.7388,
                longitude: -101.2631
            },
            delivery: {
                status: "idle",
                latitude: null,
                longitude: null
            }
        }
    ];

    it('should render the component with the right props when idActive is empty', () => {


        const activeProps = {
            idActive: ""
        }

        const wrapper = shallow(<DeliveriesView deliveries={deliveriesMock} activeProps={activeProps} />);
        expect(
            wrapper.matchesElement(
                <div>
                    <h1>Deliveries list:</h1>
                    {deliveriesMock.map((delivery) => (
                        <div key={delivery.id}>
                            <Link to={`/${delivery.id}`}>{delivery.client}</Link>
                        </div>
                    ))}
                </div>
            )
        ).toBe(true);
    });

    it('should render the component with the right props when idActive is equal delivery id', () => {
        const activeProps = {
            idActive: "1"
        }
        const wrapper = shallow(<DeliveriesView deliveries={deliveriesMock} activeProps={activeProps} />);
        expect(
            wrapper.matchesElement(
                <div>
                    <h1>Deliveries list:</h1>
                    {deliveriesMock.map((delivery) => (
                        <div key={delivery.id}>
                            <Link to={`/${delivery.id}`}>{delivery.client}</Link>
                            <p>Delivery active</p>
                        </div>
                    ))}
                </div>
            )
        ).toBe(true);
    });
});
