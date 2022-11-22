import React, { createContext, useState } from 'react';

import { Database } from 'teleport/Discover/Database/resources';

interface DatabaseContextState {
  database: Database;
  setDatabase: (Database) => void;
}

const databaseContext = createContext<DatabaseContextState>(null);

interface DatabaseProviderProps {
  children?: React.ReactNode;
}

export function DatabaseProvider(props: DatabaseProviderProps) {
  const [database, setDatabase] = useState<Database>(null);

  return (
    <databaseContext.Provider value={{ database, setDatabase }}>
      {props.children}
    </databaseContext.Provider>
  );
}
