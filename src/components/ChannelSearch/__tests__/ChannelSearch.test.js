import React from 'react';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import { ChannelSearch } from '../ChannelSearch';
import { generateUser, getTestClientWithUser } from '../../../mock-builders';
import { Chat } from '../../Chat';

let chatClient;
const user = generateUser({ id: 'id', name: 'name' });
const testId = 'channel-search';

const renderSearch = async ({ props }) => {
  const renderResult = render(
    <Chat client={chatClient}>
      <ChannelSearch {...props} />
    </Chat>,
  );

  const channelSearch = await waitFor(() => renderResult.getByTestId(testId));

  const typeText = (text) => {
    fireEvent.change(channelSearch, { target: { value: text } });
  };
  return { ...renderResult, channelSearch, typeText };
};

describe('ChannelSearch', () => {
  beforeEach(async () => {
    chatClient = await getTestClientWithUser(user);
  });

  afterEach(cleanup);

  it('should render component without any props', async () => {
    const { channelSearch } = await renderSearch({});
    expect(channelSearch).toMatchInlineSnapshot(`
      <div
        class="str-chat__channel-search"
        data-testid="channel-search"
      >
        <input
          class="str-chat__channel-search-input"
          placeholder="Search"
          type="text"
          value=""
        />
        
      </div>
    `);
  });
  it('displays custom placeholder', async () => {
    const placeholder = 'Custom placeholder';
    const { channelSearch } = await renderSearch({ props: { placeholder } });
    expect(channelSearch).toMatchInlineSnapshot(`
      <div
        class="str-chat__channel-search"
        data-testid="channel-search"
      >
        <input
          class="str-chat__channel-search-input"
          placeholder="Custom placeholder"
          type="text"
          value=""
        />
        
      </div>
    `);
  });
});
