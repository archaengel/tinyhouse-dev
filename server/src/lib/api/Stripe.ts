import stripe from 'stripe';

const client = new stripe(`${process.env.S_SECRET_KEY}`, {
  apiVersion: '2019-12-03',
  typescript: true
});

export const Stripe = {
  connect: async (code: string) => {
    const response = await client.oauth.token({
      // eslint-disable-next-line @typescript-eslint/camelcase
      grant_type: 'authorization_code',
      code
    });

    return response;
  },
  charge: async (amount: number, source: string, stripeAccount: string) => {
    const res = await client.charges.create(
      {
        /* eslint-disable @typescript-eslint/camelcase */
        amount,
        currency: 'USD',
        source,
        application_fee_amount: Math.round(amount * 0.05)
      },
      {
        stripeAccount
        /* eslint-enable @typescript-eslint/camelcase */
      }
    );

    if (res.status !== 'succeeded') {
      throw new Error('Failed to create charge with Stripe!');
    }
  }
};
