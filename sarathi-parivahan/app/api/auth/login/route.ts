import { MongoClient, ServerApiVersion } from 'mongodb';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

const uri = process.env.MONGO_URI;

async function getDB() {
  const client = new MongoClient(uri as string, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  await client.connect();
  return client.db("SarathiParivahan");
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Validation
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    const db = await getDB();
    const users = db.collection("User");

    // Find user
    const user = await users.findOne({ username });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Login successful',
        userId: user._id,
        username: user.username
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
