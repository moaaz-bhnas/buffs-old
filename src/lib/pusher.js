import Pusher from "pusher";

const {
  NEXT_PUBLIC_PUSHER_APP_ID,
  NEXT_PUBLIC_PUSHER_KEY,
  NEXT_PUBLIC_PUSHER_SECRET,
  NEXT_PUBLIC_PUSHER_CLUSTER,
} = process.env;

const pusher = new Pusher({
  appId: NEXT_PUBLIC_PUSHER_APP_ID,
  key: NEXT_PUBLIC_PUSHER_KEY,
  secret: NEXT_PUBLIC_PUSHER_SECRET,
  cluster: NEXT_PUBLIC_PUSHER_CLUSTER,
  useTLS: true,
});

export default pusher;
