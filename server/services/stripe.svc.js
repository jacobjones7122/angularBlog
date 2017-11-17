"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
function charge(token, amt) {
    return stripe.charges.create({
        amount: amt * 100,
        currency: 'usd',
        source: token,
        description: 'Statement description'
    });
}
exports.charge = charge;
