import { MongoClient, ServerApiVersion } from 'mongodb';
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
    const { userId, serviceId, serviceName, serviceCategory, description, formData } = await request.json();

    // Validation
    if (!userId || !serviceId || !serviceName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const db = await getDB();
    const users = db.collection("User");

    // Create application object
    const application = {
      application_id: new Date().getTime().toString(),
      service_id: serviceId,
      service_name: serviceName,
      service_category: serviceCategory,
      description: description,
      form_data: formData,
      submitted_at: new Date(),
      status: 'submitted'
    };

    // Update user's applications array
    const result = await users.updateOne(
      { _id: require('mongodb').ObjectId.isValid(userId) ? new (require('mongodb').ObjectId)(userId) : userId },
      { $push: { applications: application } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Application submitted successfully',
        application: application
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Application submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
