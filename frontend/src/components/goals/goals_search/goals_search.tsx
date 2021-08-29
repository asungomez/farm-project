import { EuiSearchBar, Query } from '@elastic/eui';
import React, { useState } from 'react';

type GoalsSearchProps = {
  onSearch: (query: Query) => void;
  onCancelSearch: () => void;
};

type GoalsSearchQueryArgs = {
  query: Query | null;
  queryText: string;
  error: Error | null;
};

const initialQuery = Query.MATCH_ALL;

const GoalsSearch: React.FC<GoalsSearchProps> = ({
  onSearch,
  onCancelSearch,
}) => {
  const [query, setQuery] = useState<Query>(initialQuery);

  const schema = {
    strict: false,
    fields: {
      completionDate: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
      dueDate: {
        type: 'string',
      },
      status: {
        type: 'string',
      },
      isKeyCompanyGoal: {
        type: 'boolean',
      },
      name: {
        type: 'string',
      },
      progress: {
        type: 'number',
      },
      startDate: {
        type: 'string',
      },
    },
  };

  const onChange = ({ query }: GoalsSearchQueryArgs) => {
    if (!query.text || query.text === '') {
      onCancelSearch();
    } else {
      onSearch(query);
    }
    setQuery(query);
  };

  return (
    <EuiSearchBar
      box={{
        schema,
      }}
      defaultQuery={initialQuery}
      query={query}
      onChange={onChange}
    />
  );
};

export default GoalsSearch;
