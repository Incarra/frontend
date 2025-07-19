import { Connection, PublicKey, Transaction, sendAndConfirmTransaction } from '@solana/web3.js'
import { Program, AnchorProvider, web3, BN } from '@project-serum/anchor'
import { IDL } from '../types/incarra_agent'

export interface IncarraAgent {
  owner: PublicKey
  agentName: string
  personality: string
  createdAt: number
  lastInteraction: number
  carvId: string
  carvVerified: boolean
  verificationSignature: string
  reputationScore: number
  credentials: CarvCredential[]
  achievements: CarvAchievement[]
  level: number
  experience: number
  reputation: number
  totalInteractions: number
  researchProjects: number
  dataSourcesConnected: number
  aiConversations: number
  knowledgeAreas: string[]
  isActive: boolean
}

export interface CarvCredential {
  credentialType: string
  credentialData: string
  issuer: string
  issuedAt: number
  isVerified: boolean
}

export interface CarvAchievement {
  name: string
  description: string
  score: number
  earnedAt: number
}

export interface CarvProfile {
  carvId: string
  isVerified: boolean
  reputationScore: number
  credentialsCount: number
  achievementsCount: number
  totalInteractions: number
  level: number
}

export interface IncarraContext {
  owner: PublicKey
  agentName: string
  personality: string
  level: number
  experience: number
  reputation: number
  knowledgeAreas: string[]
  totalInteractions: number
  researchProjects: number
  aiConversations: number
  carvId: string
  carvVerified: boolean
  reputationScore: number
}

export enum InteractionType {
  ResearchQuery = 'ResearchQuery',
  DataAnalysis = 'DataAnalysis',
  Conversation = 'Conversation',
  ProblemSolving = 'ProblemSolving'
}

export class IncarraContractClient {
  private program: Program
  private connection: Connection
  private provider: AnchorProvider

  constructor(connection: Connection, provider: AnchorProvider) {
    this.connection = connection
    this.provider = provider
    this.program = new Program(IDL, '9cPZ5PjWUmL9g3os5d7xqsy9XSSKP2ekMNiYRNRYyV1', provider)
  }

  /**
   * Create a new Incarra agent with Carv ID integration
   */
  async createIncarraAgent(
    agentName: string,
    personality: string,
    carvId: string,
    verificationSignature: string
  ): Promise<string> {
    try {
      const [incarraAgentPda] = PublicKey.findProgramAddressSync(
        [Buffer.from('incarra_agent'), this.provider.publicKey!.toBuffer()],
        this.program.programId
      )

      const tx = await this.program.methods
        .createIncarraAgent(agentName, personality, carvId, verificationSignature)
        .accounts({
          incarraAgent: incarraAgentPda,
          user: this.provider.publicKey!,
          systemProgram: web3.SystemProgram.programId,
        })
        .rpc()

      return tx
    } catch (error) {
      console.error('Error creating Incarra agent:', error)
      throw error
    }
  }

  /**
   * Verify Carv ID ownership
   */
  async verifyCarvId(verificationProof: string): Promise<string> {
    try {
      const [incarraAgentPda] = PublicKey.findProgramAddressSync(
        [Buffer.from('incarra_agent'), this.provider.publicKey!.toBuffer()],
        this.program.programId
      )

      const tx = await this.program.methods
        .verifyCarvId(verificationProof)
        .accounts({
          incarraAgent: incarraAgentPda,
          owner: this.provider.publicKey!,
        })
        .rpc()

      return tx
    } catch (error) {
      console.error('Error verifying Carv ID:', error)
      throw error
    }
  }

  /**
   * Add a credential to the agent's Carv profile
   */
  async addCredential(
    credentialType: string,
    credentialData: string,
    issuer: string
  ): Promise<string> {
    try {
      const [incarraAgentPda] = PublicKey.findProgramAddressSync(
        [Buffer.from('incarra_agent'), this.provider.publicKey!.toBuffer()],
        this.program.programId
      )

      const tx = await this.program.methods
        .addCredential(credentialType, credentialData, issuer)
        .accounts({
          incarraAgent: incarraAgentPda,
          owner: this.provider.publicKey!,
        })
        .rpc()

      return tx
    } catch (error) {
      console.error('Error adding credential:', error)
      throw error
    }
  }

  /**
   * Add achievement to agent's profile
   */
  async addAchievement(
    achievementName: string,
    achievementDescription: string,
    achievementScore: number
  ): Promise<string> {
    try {
      const [incarraAgentPda] = PublicKey.findProgramAddressSync(
        [Buffer.from('incarra_agent'), this.provider.publicKey!.toBuffer()],
        this.program.programId
      )

      const tx = await this.program.methods
        .addAchievement(achievementName, achievementDescription, new BN(achievementScore))
        .accounts({
          incarraAgent: incarraAgentPda,
          owner: this.provider.publicKey!,
        })
        .rpc()

      return tx
    } catch (error) {
      console.error('Error adding achievement:', error)
      throw error
    }
  }

  /**
   * Record interaction with the AI agent
   */
  async interactWithIncarra(
    interactionType: InteractionType,
    experienceGained: number,
    contextData: string
  ): Promise<string> {
    try {
      const [incarraAgentPda] = PublicKey.findProgramAddressSync(
        [Buffer.from('incarra_agent'), this.provider.publicKey!.toBuffer()],
        this.program.programId
      )

      const tx = await this.program.methods
        .interactWithIncarra(interactionType, new BN(experienceGained), contextData)
        .accounts({
          incarraAgent: incarraAgentPda,
          owner: this.provider.publicKey!,
        })
        .rpc()

      return tx
    } catch (error) {
      console.error('Error recording interaction:', error)
      throw error
    }
  }

  /**
   * Get Carv profile data
   */
  async getCarvProfile(): Promise<CarvProfile> {
    try {
      const [incarraAgentPda] = PublicKey.findProgramAddressSync(
        [Buffer.from('incarra_agent'), this.provider.publicKey!.toBuffer()],
        this.program.programId
      )

      const profile = await this.program.methods
        .getCarvProfile()
        .accounts({
          incarraAgent: incarraAgentPda,
        })
        .view()

      return profile as CarvProfile
    } catch (error) {
      console.error('Error getting Carv profile:', error)
      throw error
    }
  }

  /**
   * Add knowledge area to the agent
   */
  async addKnowledgeArea(knowledgeArea: string): Promise<string> {
    try {
      const [incarraAgentPda] = PublicKey.findProgramAddressSync(
        [Buffer.from('incarra_agent'), this.provider.publicKey!.toBuffer()],
        this.program.programId
      )

      const tx = await this.program.methods
        .addKnowledgeArea(knowledgeArea)
        .accounts({
          incarraAgent: incarraAgentPda,
          owner: this.provider.publicKey!,
        })
        .rpc()

      return tx
    } catch (error) {
      console.error('Error adding knowledge area:', error)
      throw error
    }
  }

  /**
   * Update agent personality
   */
  async updatePersonality(newPersonality: string): Promise<string> {
    try {
      const [incarraAgentPda] = PublicKey.findProgramAddressSync(
        [Buffer.from('incarra_agent'), this.provider.publicKey!.toBuffer()],
        this.program.programId
      )

      const tx = await this.program.methods
        .updatePersonality(newPersonality)
        .accounts({
          incarraAgent: incarraAgentPda,
          owner: this.provider.publicKey!,
        })
        .rpc()

      return tx
    } catch (error) {
      console.error('Error updating personality:', error)
      throw error
    }
  }

  /**
   * Get Incarra context data
   */
  async getIncarraContext(): Promise<IncarraContext> {
    try {
      const [incarraAgentPda] = PublicKey.findProgramAddressSync(
        [Buffer.from('incarra_agent'), this.provider.publicKey!.toBuffer()],
        this.program.programId
      )

      const context = await this.program.methods
        .getIncarraContext()
        .accounts({
          incarraAgent: incarraAgentPda,
        })
        .view()

      return context as IncarraContext
    } catch (error) {
      console.error('Error getting Incarra context:', error)
      throw error
    }
  }

  /**
   * Deactivate the Incarra agent
   */
  async deactivateIncarra(): Promise<string> {
    try {
      const [incarraAgentPda] = PublicKey.findProgramAddressSync(
        [Buffer.from('incarra_agent'), this.provider.publicKey!.toBuffer()],
        this.program.programId
      )

      const tx = await this.program.methods
        .deactivateIncarra()
        .accounts({
          incarraAgent: incarraAgentPda,
          owner: this.provider.publicKey!,
        })
        .rpc()

      return tx
    } catch (error) {
      console.error('Error deactivating Incarra:', error)
      throw error
    }
  }

  /**
   * Get the full Incarra agent data
   */
  async getIncarraAgent(): Promise<IncarraAgent | null> {
    try {
      const [incarraAgentPda] = PublicKey.findProgramAddressSync(
        [Buffer.from('incarra_agent'), this.provider.publicKey!.toBuffer()],
        this.program.programId
      )

      const account = await this.program.account.incarraAgent.fetch(incarraAgentPda)
      return account as IncarraAgent
    } catch (error) {
      console.error('Error fetching Incarra agent:', error)
      return null
    }
  }

  /**
   * Check if user has an Incarra agent
   */
  async hasIncarraAgent(): Promise<boolean> {
    try {
      const [incarraAgentPda] = PublicKey.findProgramAddressSync(
        [Buffer.from('incarra_agent'), this.provider.publicKey!.toBuffer()],
        this.program.programId
      )

      const account = await this.connection.getAccountInfo(incarraAgentPda)
      return account !== null
    } catch (error) {
      console.error('Error checking Incarra agent existence:', error)
      return false
    }
  }
} 