import { connect } from "react-redux";
import { InitialState, User } from "shared/model/poll";

export interface LeaderBoardPropsEmployee {
  users: User[];
}


export const LeaderBoardEmployee = ({ users }: LeaderBoardPropsEmployee) => {
  const newUsers = users.sort(
    (a: User, b: User) =>
      Object.entries(b.answers).length - Object.entries(a.answers).length ||
      b.questions.length - a.questions.length
  );
  return (
    <div className="leaderboard">
      <h1 className="text-3xl font-bold mt-9">Leaderboard</h1>

      <table className="min-w-full leading-normal">
        <thead>
          <tr className="table-row">
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              User
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Answered
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Created
            </th>
          </tr>
        </thead>
        <tbody>
          {newUsers.map((user) => (
            <tr key={user.id}>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div className="flex">
                  <div className="flex-shrink-0 w-10 h-10">
                    <img
                      className="w-full h-full rounded-full"
                      src={user.avatarURL}
                      alt="avatar"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {user.name}
                    </p>
                    <p className="text-gray-600 whitespace-no-wrap">
                      {user.id}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {Object.keys(user.answers).length}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {user.questions.length}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapPropFromStates = ({ State }: { State: InitialState }) => ({
  users: Object.values(State.users).sort(
    (a, b) => Object.keys(b.answers).length - Object.keys(a.answers).length
  ),
});

export default connect(mapPropFromStates)(LeaderBoardEmployee);

