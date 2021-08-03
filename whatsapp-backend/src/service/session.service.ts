import { FilterQuery, LeanDocument, UpdateQuery } from "mongoose";
import Session, { SessionDocument } from "../model/session.model";

export async function createSession(userId: string, userAgent: string) {
	const session = await Session.create({ user: userId, userAgent: userAgent });

	return session.toJSON();
}

export async function updateSession(
	query: FilterQuery<SessionDocument>,
	update: UpdateQuery<SessionDocument>
) {
	return Session.updateOne(query, update);
}


export async function findSessions(query: FilterQuery<SessionDocument>) {
	return Session.find(query).lean();
}