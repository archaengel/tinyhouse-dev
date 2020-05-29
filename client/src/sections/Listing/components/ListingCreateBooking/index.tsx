import React from 'react';
import moment, { Moment } from 'moment';
import { Button, Card, DatePicker, Divider, Typography } from 'antd';
import { displayErrorMessage, formatListingPrice } from '../../../../lib/utils';
import { Viewer } from '../../../../lib/types';
import { Listing as ListingData } from '../../../../lib/graphql/queries/Listing/__generated__/Listing';
import { BookingsIndex } from './types';

const { Text, Paragraph, Title } = Typography;

interface Props {
  price: number;
  checkInDate: Moment | null;
  checkOutDate: Moment | null;
  setCheckInDate: (checkInDate: Moment | null) => void;
  setCheckOutDate: (checkOutDate: Moment | null) => void;
  viewer: Viewer;
  host: ListingData['listing']['host'];
  bookingsIndex: ListingData['listing']['bookingsIndex'];
  setModalVisible: (modalVisible: boolean) => void;
}

export const ListingCreateBooking = ({
  price,
  checkInDate,
  checkOutDate,
  setCheckInDate,
  setCheckOutDate,
  viewer,
  host,
  bookingsIndex,
  setModalVisible,
}: Props) => {
  const bookingsIndexJSON: BookingsIndex = JSON.parse(bookingsIndex);
  const dateIsBooked = (currentDate?: Moment) => {
    const year = moment(currentDate).year();
    const month = moment(currentDate).month();
    const day = moment(currentDate).date();

    if (bookingsIndexJSON[year] && bookingsIndexJSON[year][month]) {
      console.log(bookingsIndexJSON);
      console.log(Boolean(bookingsIndexJSON[year][month][day]));
      return Boolean(bookingsIndexJSON[year][month][day]);
    }

    return false;
  };

  const disabledDate = (currentDate: Moment | null) => {
    if (currentDate) {
      const dateIsBeforeEndOfDay = currentDate.isBefore(moment().endOf('day'));

      return dateIsBeforeEndOfDay || dateIsBooked(currentDate);
    }

    return false;
  };

  const verifyAndSetCheckOutDate = (selectedCheckOutDate: Moment | null) => {
    if (checkInDate && selectedCheckOutDate) {
      if (moment(selectedCheckOutDate).isBefore(checkInDate, 'days')) {
        return displayErrorMessage(
          `You can't book date of check out to be prior to check in!`
        );
      }

      let dateCursor = checkInDate;

      while (moment(dateCursor).isBefore(selectedCheckOutDate, 'days')) {
        dateCursor = moment(dateCursor).add(1, 'days');

        const year = moment(dateCursor).year();
        const month = moment(dateCursor).month();
        const day = moment(dateCursor).day();

        if (
          bookingsIndexJSON[year] &&
          bookingsIndexJSON[year][month] &&
          bookingsIndex[year][month][day]
        ) {
          return displayErrorMessage(
            "You can't book a period of time that overlaps existing bookings. Please try again!"
          );
        }
      }
    }
    setCheckOutDate(selectedCheckOutDate);
  };

  const viewerIsHost = viewer.id === host.id;
  const checkInInputDisabled = viewerIsHost || !viewer.id;
  const checkOutInputDisabled = checkInInputDisabled || !checkInDate;
  const buttonDisabled = checkOutInputDisabled || !checkInDate || !checkOutDate;
  let buttonMessage = "You won't be charged yet";
  if (!viewer.id) {
    buttonMessage = 'You must be signed in to book a listing';
  }
  if (viewerIsHost) {
    buttonMessage = "You can't book your own listing!";
  }
  if (!host.hasWallet) {
    buttonMessage =
      'The host has disconnected from Stripe and is unable to recieve payments at this time';
  }

  return (
    <div className="listing-booking">
      <Card className="listing-booking__card">
        <div>
          <Paragraph>
            <Title level={2} className="listing-booking__card-title">
              {formatListingPrice(price)}
              <span>/day</span>
            </Title>
          </Paragraph>

          <Divider />

          <div className="listing-booking__card-date-picker">
            <Paragraph strong>Check In</Paragraph>
            <DatePicker
              value={checkInDate ? checkInDate : undefined}
              format={'YYYY/MM/DD'}
              onChange={setCheckInDate}
              disabled={checkInInputDisabled}
              disabledDate={disabledDate}
              showToday={false}
              onOpenChange={() => setCheckOutDate(null)}
            />
          </div>
          <div className="listing-booking__card-date-picker">
            <Paragraph strong>Check Out</Paragraph>
            <DatePicker
              value={checkOutDate ? checkOutDate : undefined}
              format={'YYYY/MM/DD'}
              onChange={verifyAndSetCheckOutDate}
              disabledDate={disabledDate}
              showToday={false}
              disabled={checkOutInputDisabled}
            />
          </div>
        </div>

        <Divider />
        <Button
          disabled={buttonDisabled}
          size="large"
          type="primary"
          className="listing-booking__card-cta"
          onClick={() => setModalVisible(true)}
        >
          Request to book!
        </Button>
        <Text type="secondary" mark>
          {buttonMessage}
        </Text>
      </Card>
    </div>
  );
};