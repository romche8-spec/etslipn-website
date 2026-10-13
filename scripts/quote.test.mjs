import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source = fs.readFileSync('dist/assets/app.js', 'utf8');
const fn = source.slice(source.indexOf('function buildQuoteMessage'), source.indexOf('const form ='));
const context = vm.createContext({}); vm.runInContext(fn, context);
test('WhatsApp message preserves accented text and every project detail', () => {
 const data = {name:'Élodie & Fils',organization:'Agriculture RDC',phone:'+243970000000',email:'test@example.com',service:'Transport & logistique',location:'Kalemie → Kigoma',date:'2026-11-01',details:'20 tonnes\nBudget : $2 000 & manutention'};
 const text = context.buildQuoteMessage(data);
 for (const value of Object.values(data)) assert(text.includes(value));
 const url = new URL(`https://wa.me/243970339904?text=${encodeURIComponent(text)}`);
 assert.equal(url.searchParams.get('text'), text);
 assert.equal(url.pathname, '/243970339904');
});
test('Optional fields have clear defaults', () => {
 const text = context.buildQuoteMessage({name:'A',phone:'123',service:'Carburant',location:'Kabalo',details:'Gasoil'});
 assert(text.includes('Non précisée')); assert(text.includes('À convenir')); assert(!text.includes('undefined'));
});
