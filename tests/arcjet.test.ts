import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import aj from '../lib/arcjet';

describe('Arcjet Security & Rate Limiting Setup', () => {
  it('initializes Arcjet client with protect and withRule methods', () => {
    assert.ok(aj, 'Arcjet client should be defined');
    assert.equal(typeof aj.protect, 'function', 'aj.protect must be a callable function');
    assert.equal(typeof aj.withRule, 'function', 'aj.withRule must be a callable function');
  });

  it('client provides request protection interface', () => {
    assert.ok('protect' in aj, 'Client must implement protect()');
    assert.ok('withRule' in aj, 'Client must implement withRule()');
  });
});
