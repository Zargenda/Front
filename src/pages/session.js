import React from 'react';
const Session = React.createContext({ sessionActive: false, setSessionActive: () => {}
});
const SessionRole = React.createContext({ sessionRole: "", setSessionRole: () => {} 
});
const SessionEmail = React.createContext({ sessionEmail: "", setSessionEmail: () => {} 
});
export {Session, SessionRole, SessionEmail};