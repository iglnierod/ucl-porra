export function StandingUser({ user }) {
  return (
    <article className="flex w-100 p-2 justify-between items-center">
      <div className="flex items-center gap-4">
        <img
          className="w-12 h-12 rounded-full object-cover"
          src={user.imageUrl}
          alt={user.name}
        />
        <h3 className="text-l font-semibold tracking-wide">{user.name}</h3>
      </div>
      <div className="ml-4">
        <p className="text-sm">{user.points} pts</p>
      </div>
    </article>
  );
}
