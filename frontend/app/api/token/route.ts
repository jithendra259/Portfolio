import { NextResponse } from 'next/server';
import { AccessToken, type AccessTokenOptions, type VideoGrant } from 'livekit-server-sdk';
import { RoomAgentDispatch, RoomConfiguration } from '@livekit/protocol';

// Default LiveKit Cloud credentials for Jithendra's Portfolio
const DEFAULT_LIVEKIT_URL_CLOUD = 'wss://finalportfolio-oupyq216.livekit.cloud';
const DEFAULT_LIVEKIT_URL_LOCAL = 'ws://localhost:7880';
const DEFAULT_API_KEY = 'APIpNgBX9wyBxtW';
const DEFAULT_API_SECRET = 'G2fDHl43npR55gH7lgXofuzqYb3XOtzeAZK0wvRZtLVA';
const DEFAULT_AGENT_NAME = 'my-agent';

// LiveKit mode from environment: "cloud" (default) or "local"
const LIVEKIT_MODE = process.env.NEXT_PUBLIC_LIVEKIT_MODE || 'cloud';

// Select LiveKit URL based on mode
const DEFAULT_LIVEKIT_URL = LIVEKIT_MODE === 'local' 
  ? DEFAULT_LIVEKIT_URL_LOCAL 
  : DEFAULT_LIVEKIT_URL_CLOUD;

// LiveKit credentials from environment or fallbacks
const API_KEY = process.env.LIVEKIT_API_KEY || DEFAULT_API_KEY;
const API_SECRET = process.env.LIVEKIT_API_SECRET || DEFAULT_API_SECRET;
const LIVEKIT_URL = process.env.LIVEKIT_URL || DEFAULT_LIVEKIT_URL;
const AGENT_NAME =
  process.env.NEXT_PUBLIC_AGENT_NAME || process.env.AGENT_NAME || DEFAULT_AGENT_NAME;

// don't cache the results
export const revalidate = 0;

async function handleTokenRequest(req: Request) {
  // Allow public token generation for portfolio voice assistant
  if (process.env.LIVEKIT_RESTRICT_ACCESS === 'true' && process.env.NODE_ENV === 'production') {
    return new NextResponse('Access to voice agent token endpoint is currently restricted.', {
      status: 403,
    });
  }

  try {
    if (!LIVEKIT_URL) {
      throw new Error('LIVEKIT_URL is not defined');
    }
    if (!API_KEY) {
      throw new Error('LIVEKIT_API_KEY is not defined');
    }
    if (!API_SECRET) {
      throw new Error('LIVEKIT_API_SECRET is not defined');
    }

    // Parse body safely (supports empty body, GET, or malformed JSON)
    let body: {
      room_name?: string;
      roomName?: string;
      participant_name?: string;
      participantName?: string;
      agent_name?: string;
      agentName?: string;
      room_config?: unknown;
    } = {};
    if (req.method === 'POST') {
      try {
        const text = await req.text();
        if (text && text.trim().length > 0) {
          body = JSON.parse(text);
        }
      } catch {
        body = {};
      }
    }

    // Parse query params if available
    let requestedRoom = body?.room_name || body?.roomName;
    let requestedParticipant = body?.participant_name || body?.participantName;
    let requestedAgent = body?.agent_name || body?.agentName || AGENT_NAME;

    try {
      const url = new URL(req.url);
      const searchRoom = url.searchParams.get('room');
      if (!requestedRoom && searchRoom) {
        requestedRoom = searchRoom;
      }
      const searchName = url.searchParams.get('name');
      if (!requestedParticipant && searchName) {
        requestedParticipant = searchName;
      }
      const searchAgent = url.searchParams.get('agent');
      if (searchAgent) {
        requestedAgent = searchAgent;
      }
    } catch {
      // ignore url parsing error
    }

    // Parse room config from request body
    let roomConfig: RoomConfiguration;
    if (body?.room_config) {
      roomConfig = RoomConfiguration.fromJson(body.room_config as never, {
        ignoreUnknownFields: true,
      });
    } else {
      roomConfig = new RoomConfiguration();
    }

    // Ensure agent dispatch is present if an agent name is configured
    if (requestedAgent && roomConfig.agents.length === 0) {
      const agentDispatch = new RoomAgentDispatch({
        agentName: requestedAgent,
      });
      roomConfig.agents.push(agentDispatch);
    }

    // Generate participant identity and room name
    const participantName = requestedParticipant || 'Guest User';
    const participantIdentity = `voice_user_${Math.floor(1000 + Math.random() * 9000)}`;
    const roomName = requestedRoom || `portfolio_voice_${Math.floor(1000 + Math.random() * 9000)}`;

    const participantToken = await createParticipantToken(
      { identity: participantIdentity, name: participantName },
      roomName,
      roomConfig
    );

    // Return connection details with both camelCase and snake_case for full compatibility
    const data = {
      serverUrl: LIVEKIT_URL,
      server_url: LIVEKIT_URL,
      roomName,
      room_name: roomName,
      participantName,
      participant_name: participantName,
      participantToken,
      participant_token: participantToken,
      agentName: requestedAgent,
      status: 'ready',
    };

    const headers = new Headers({
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    });

    return NextResponse.json(data, { headers });
  } catch (error) {
    console.error('Error in /api/token:', error);
    const message = error instanceof Error ? error.message : 'Failed to generate token';
    return new NextResponse(message, { status: 500 });
  }
}

export async function POST(req: Request) {
  return handleTokenRequest(req);
}

export async function GET(req: Request) {
  return handleTokenRequest(req);
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

function createParticipantToken(
  userInfo: AccessTokenOptions,
  roomName: string,
  roomConfig: RoomConfiguration | undefined
): Promise<string> {
  const at = new AccessToken(API_KEY, API_SECRET, {
    ...userInfo,
    ttl: '30m',
  });
  const grant: VideoGrant = {
    room: roomName,
    roomJoin: true,
    canPublish: true,
    canPublishData: true,
    canSubscribe: true,
  };
  at.addGrant(grant);

  if (roomConfig) {
    at.roomConfig = roomConfig;
  }

  return at.toJwt();
}
