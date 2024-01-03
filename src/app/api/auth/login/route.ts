const admins = {
  password: 'admin',
  email: 'admin@gmail.com',
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('data', body);

    const { email, password }: { email: string; password: string } = body;

    if (email === admins.email && password === admins.password) {
      return Response.json({ accessToken: 'haha.tada', user: {} }, { status: 200 });
    }

    return Response.json({ message: 'You are not admin' }, { status: 404 });
  } catch (error) {
    console.log(error);
  }
}
