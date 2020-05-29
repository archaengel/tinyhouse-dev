import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link, useParams } from 'react-router-dom';
import { Affix, Layout, List, Typography } from 'antd';
import {
  ListingsFilters,
  ListingsPagination,
  ListingsSkeleton
} from './components';
import { ListingCard, ErrorBanner } from '../../lib/components';
import { LISTINGS } from '../../lib/graphql/queries';
import {
  Listings as ListingsData,
  ListingsVariables
} from '../../lib/graphql/queries/Listings/__generated__/Listings';
import { ListingsFilter } from '../../lib/graphql/globalTypes';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;
const PAGE_LIMIT = 8;

interface MatchParams {
  location: string;
}

export const Listings = () => {
  const { location } = useParams<MatchParams>();
  const locationRef = useRef(location);
  const [filter, setFilter] = useState(ListingsFilter.PRICE_LOW_TO_HIGH);
  const [page, setPage] = useState(1);
  const { data, loading, error } = useQuery<ListingsData, ListingsVariables>(
    LISTINGS,
    {
      skip: locationRef.current !== location && page !== 1,
      variables: {
        location,
        filter,
        limit: PAGE_LIMIT,
        page
      }
    }
  );

  useEffect(() => {
    setPage(1);
    locationRef.current = location;
  }, [location]);

  if (error) {
    return (
      <Content className="listings">
        <ErrorBanner description="We either couldn't find matching your search or have encounterd an error. If you're searching for a unique location, try searching again with more common keywords." />
        <ListingsSkeleton />
      </Content>
    );
  }

  if (loading) {
    return (
      <Content className="listings">
        <ListingsSkeleton />
      </Content>
    );
  }

  const listings = data ? data.listings : null;
  const listingsRegion = listings ? listings.region : null;

  const listingsSectionElement =
    listings && listings.result.length ? (
      <div>
        <Affix offsetTop={64}>
          <div className="listings__affix">
            <ListingsPagination
              page={page}
              setPage={setPage}
              limit={PAGE_LIMIT}
              total={listings.total}
            />
            <ListingsFilters filter={filter} setFilter={setFilter} />
          </div>
        </Affix>
        <List
          grid={{
            gutter: 8,
            lg: 4,
            sm: 2,
            xs: 1
          }}
          dataSource={listings.result}
          renderItem={(listing) => (
            <List.Item>
              <ListingCard listing={listing} />
            </List.Item>
          )}
        />
      </div>
    ) : (
      <div>
        <Paragraph>
          It appears no listings have yet been created for{' '}
          <Text mark>"{listingsRegion}"</Text>
        </Paragraph>
        <Paragraph>
          Be the first person to create a{' '}
          <Link to="host">listing in this area</Link>!
        </Paragraph>
      </div>
    );

  const listingsRegionElement = listingsRegion ? (
    <Title level={3} className="listings__title">
      Results for "{listingsRegion}"
    </Title>
  ) : null;

  return (
    <Content className="listings">
      {listingsRegionElement}
      {listingsSectionElement}
    </Content>
  );
};
