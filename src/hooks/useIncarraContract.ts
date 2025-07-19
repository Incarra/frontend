import { useState, useEffect, useCallback } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { AnchorProvider } from '@project-serum/anchor'
import { 
  IncarraContractClient, 
  IncarraAgent, 
  CarvProfile, 
  IncarraContext, 
  InteractionType,
  CarvCredential,
  CarvAchievement
} from '@/lib/contract-client'

export function useIncarraContract() {
  const { connection } = useConnection()
  const { publicKey, signTransaction, signAllTransactions } = useWallet()
  
  const [contractClient, setContractClient] = useState<IncarraContractClient | null>(null)
  const [incarraAgent, setIncarraAgent] = useState<IncarraAgent | null>(null)
  const [carvProfile, setCarvProfile] = useState<CarvProfile | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Initialize contract client when wallet connects
  useEffect(() => {
    if (publicKey && signTransaction && signAllTransactions) {
      const provider = new AnchorProvider(
        connection,
        {
          publicKey,
          signTransaction,
          signAllTransactions,
        },
        { commitment: 'confirmed' }
      )
      
      const client = new IncarraContractClient(connection, provider)
      setContractClient(client)
    } else {
      setContractClient(null)
    }
  }, [connection, publicKey, signTransaction, signAllTransactions])

  // Load agent data when contract client is available
  useEffect(() => {
    if (contractClient) {
      loadAgentData()
    }
  }, [contractClient])

  const loadAgentData = useCallback(async () => {
    if (!contractClient) return

    try {
      setLoading(true)
      setError(null)

      const hasAgent = await contractClient.hasIncarraAgent()
      if (hasAgent) {
        const agent = await contractClient.getIncarraAgent()
        const profile = await contractClient.getCarvProfile()
        
        setIncarraAgent(agent)
        setCarvProfile(profile)
      } else {
        setIncarraAgent(null)
        setCarvProfile(null)
      }
    } catch (err) {
      console.error('Error loading agent data:', err)
      setError(err instanceof Error ? err.message : 'Failed to load agent data')
    } finally {
      setLoading(false)
    }
  }, [contractClient])

  // Contract interaction functions
  const createIncarraAgent = useCallback(async (
    agentName: string,
    personality: string,
    carvId: string,
    verificationSignature: string
  ) => {
    if (!contractClient) throw new Error('Wallet not connected')

    try {
      setLoading(true)
      setError(null)

      const tx = await contractClient.createIncarraAgent(
        agentName,
        personality,
        carvId,
        verificationSignature
      )

      await loadAgentData() // Reload data after creation
      return tx
    } catch (err) {
      console.error('Error creating Incarra agent:', err)
      setError(err instanceof Error ? err.message : 'Failed to create agent')
      throw err
    } finally {
      setLoading(false)
    }
  }, [contractClient, loadAgentData])

  const verifyCarvId = useCallback(async (verificationProof: string) => {
    if (!contractClient) throw new Error('Wallet not connected')

    try {
      setLoading(true)
      setError(null)

      const tx = await contractClient.verifyCarvId(verificationProof)
      await loadAgentData() // Reload data after verification
      return tx
    } catch (err) {
      console.error('Error verifying Carv ID:', err)
      setError(err instanceof Error ? err.message : 'Failed to verify Carv ID')
      throw err
    } finally {
      setLoading(false)
    }
  }, [contractClient, loadAgentData])

  const addCredential = useCallback(async (
    credentialType: string,
    credentialData: string,
    issuer: string
  ) => {
    if (!contractClient) throw new Error('Wallet not connected')

    try {
      setLoading(true)
      setError(null)

      const tx = await contractClient.addCredential(credentialType, credentialData, issuer)
      await loadAgentData() // Reload data after adding credential
      return tx
    } catch (err) {
      console.error('Error adding credential:', err)
      setError(err instanceof Error ? err.message : 'Failed to add credential')
      throw err
    } finally {
      setLoading(false)
    }
  }, [contractClient, loadAgentData])

  const addAchievement = useCallback(async (
    achievementName: string,
    achievementDescription: string,
    achievementScore: number
  ) => {
    if (!contractClient) throw new Error('Wallet not connected')

    try {
      setLoading(true)
      setError(null)

      const tx = await contractClient.addAchievement(
        achievementName,
        achievementDescription,
        achievementScore
      )
      await loadAgentData() // Reload data after adding achievement
      return tx
    } catch (err) {
      console.error('Error adding achievement:', err)
      setError(err instanceof Error ? err.message : 'Failed to add achievement')
      throw err
    } finally {
      setLoading(false)
    }
  }, [contractClient, loadAgentData])

  const interactWithIncarra = useCallback(async (
    interactionType: InteractionType,
    experienceGained: number,
    contextData: string
  ) => {
    if (!contractClient) throw new Error('Wallet not connected')

    try {
      setLoading(true)
      setError(null)

      const tx = await contractClient.interactWithIncarra(
        interactionType,
        experienceGained,
        contextData
      )
      await loadAgentData() // Reload data after interaction
      return tx
    } catch (err) {
      console.error('Error recording interaction:', err)
      setError(err instanceof Error ? err.message : 'Failed to record interaction')
      throw err
    } finally {
      setLoading(false)
    }
  }, [contractClient, loadAgentData])

  const addKnowledgeArea = useCallback(async (knowledgeArea: string) => {
    if (!contractClient) throw new Error('Wallet not connected')

    try {
      setLoading(true)
      setError(null)

      const tx = await contractClient.addKnowledgeArea(knowledgeArea)
      await loadAgentData() // Reload data after adding knowledge area
      return tx
    } catch (err) {
      console.error('Error adding knowledge area:', err)
      setError(err instanceof Error ? err.message : 'Failed to add knowledge area')
      throw err
    } finally {
      setLoading(false)
    }
  }, [contractClient, loadAgentData])

  const updatePersonality = useCallback(async (newPersonality: string) => {
    if (!contractClient) throw new Error('Wallet not connected')

    try {
      setLoading(true)
      setError(null)

      const tx = await contractClient.updatePersonality(newPersonality)
      await loadAgentData() // Reload data after updating personality
      return tx
    } catch (err) {
      console.error('Error updating personality:', err)
      setError(err instanceof Error ? err.message : 'Failed to update personality')
      throw err
    } finally {
      setLoading(false)
    }
  }, [contractClient, loadAgentData])

  const deactivateIncarra = useCallback(async () => {
    if (!contractClient) throw new Error('Wallet not connected')

    try {
      setLoading(true)
      setError(null)

      const tx = await contractClient.deactivateIncarra()
      await loadAgentData() // Reload data after deactivation
      return tx
    } catch (err) {
      console.error('Error deactivating Incarra:', err)
      setError(err instanceof Error ? err.message : 'Failed to deactivate agent')
      throw err
    } finally {
      setLoading(false)
    }
  }, [contractClient, loadAgentData])

  const getIncarraContext = useCallback(async (): Promise<IncarraContext | null> => {
    if (!contractClient) return null

    try {
      const context = await contractClient.getIncarraContext()
      return context
    } catch (err) {
      console.error('Error getting Incarra context:', err)
      setError(err instanceof Error ? err.message : 'Failed to get agent context')
      return null
    }
  }, [contractClient])

  // Helper functions for quest integration
  const completeQuest = useCallback(async (
    questTitle: string,
    questDescription: string,
    xpReward: number
  ) => {
    // Add achievement for completing quest
    await addAchievement(questTitle, questDescription, xpReward)
    
    // Record interaction
    await interactWithIncarra(
      InteractionType.ProblemSolving,
      xpReward,
      `Completed quest: ${questTitle}`
    )
  }, [addAchievement, interactWithIncarra])

  const recordChatInteraction = useCallback(async (message: string) => {
    await interactWithIncarra(
      InteractionType.Conversation,
      5, // Small XP for chat
      `Chat message: ${message.substring(0, 100)}...`
    )
  }, [interactWithIncarra])

  const recordResearchInteraction = useCallback(async (topic: string) => {
    await interactWithIncarra(
      InteractionType.ResearchQuery,
      10, // XP for research
      `Research topic: ${topic}`
    )
  }, [interactWithIncarra])

  return {
    // State
    incarraAgent,
    carvProfile,
    loading,
    error,
    
    // Actions
    createIncarraAgent,
    verifyCarvId,
    addCredential,
    addAchievement,
    interactWithIncarra,
    addKnowledgeArea,
    updatePersonality,
    deactivateIncarra,
    getIncarraContext,
    loadAgentData,
    
    // Helper functions
    completeQuest,
    recordChatInteraction,
    recordResearchInteraction,
    
    // Utilities
    hasAgent: incarraAgent !== null,
    isVerified: carvProfile?.isVerified || false,
  }
} 