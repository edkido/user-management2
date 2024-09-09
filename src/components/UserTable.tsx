import React, { useEffect } from 'react';
import '../styles/UserTable.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, setFilter } from '../store/usersSlice';
import { RootState, AppDispatch } from '../store';
import { Loader } from './Loader';
import { UserItem } from './UserItem';

const UserTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredUsers, loading, error, filters } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleFilterChange = (field: keyof typeof filters, value: string) => {
    dispatch(setFilter({ field, value }));
  };

  return (
    <div>
      {loading && <Loader />}
      {error && <p>Error: {error}</p>}

      <div className="user-filters">
        <input
          className="user-filters__input"
          type="text"
          placeholder="Filter by name"
          value={filters.name}
          onChange={(e) => handleFilterChange('name', e.target.value)}
        />
        <input
          className="user-filters__input"
          type="text"
          placeholder="Filter by username"
          value={filters.username}
          onChange={(e) => handleFilterChange('username', e.target.value)}
        />
        <input
          className="user-filters__input"
          type="text"
          placeholder="Filter by email"
          value={filters.email}
          onChange={(e) => handleFilterChange('email', e.target.value)}
        />
        <input
          className="user-filters__input"
          type="text"
          placeholder="Filter by phone"
          value={filters.phone}
          onChange={(e) => handleFilterChange('phone', e.target.value)}
        />
      </div> 

      <table className="user-table">
        <thead className="user-table__header">
          <tr>
            <th className="user-table__header-cell">Name</th>
            <th className="user-table__header-cell">Username</th>
            <th className="user-table__header-cell">Email</th>
            <th className="user-table__header-cell">Phone</th>
          </tr>
        </thead>
        <tbody className="user-table__body">
          {filteredUsers.map((user) => (
            <UserItem
              key={user.id}
              name={user.name}
              username={user.username}
              email={user.email}
              phone={user.phone}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
