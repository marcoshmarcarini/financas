import { NextApiRequest, NextApiResponse } from "next";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "../../../../utils/firebase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'POST') {
            return res.status(405).json({ error: 'Method not allowed' });
        }

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json({ error: 'Invalid email or password' });
        }

        // Inicializa o Firebase antes de usar os serviços
        //initFirebase(); // Isso garante que o Firebase será inicializado corretamente

        // Obtém a instância de autenticação
        //const auth = getFirebaseAuth();

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        console.log(`Usuário criado com sucesso! ID: ${user.uid}`);
        return res.status(200).json({ message: `Usuário criado com sucesso! ID: ${user.uid}` });
    } catch (error: unknown) {
        if (error instanceof FirebaseError) {
            console.error('Erro ao criar usuário:', error);
            return res.status(500).json({ error: 'Erro ao criar usuário' });
        } else {
            console.error('Erro desconhecido:', error);
            return res.status(500).json({ error: 'Erro desconhecido' });
        }
    }
}


