import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, RefreshCw, Users, Link, Check } from 'lucide-react';
import { toast } from 'sonner';

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  workspaceId: string | number;
  workspaceName: string;
  inviteCode?: string;
  inviteLink?: string;
}

export function InviteMemberModal({ 
  isOpen, 
  onClose, 
  workspaceId, 
  workspaceName, 
  inviteCode: initialInviteCode,
  inviteLink: initialInviteLink 
}: InviteMemberModalProps) {
  const [inviteCode, setInviteCode] = useState(initialInviteCode || '');
  const [inviteLink, setInviteLink] = useState(initialInviteLink || '');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const generateInviteCode = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch(`/workspaces/${workspaceId}/generate-invite-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to generate invite code');
      }

      const data = await response.json();
      setInviteCode(data.invite_code);
      setInviteLink(data.invite_link);
      toast.success('Invite code generated successfully!');
    } catch {
      toast.error('Failed to generate invite code');
    } finally {
      setIsGenerating(false);
    }
  };

  const resetInviteCode = async () => {
    setIsResetting(true);
    try {
      const response = await fetch(`/workspaces/${workspaceId}/reset-invite-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to reset invite code');
      }

      const data = await response.json();
      setInviteCode(data.invite_code);
      setInviteLink(data.invite_link);
      toast.success('Invite code reset successfully!');
    } catch {
      toast.error('Failed to reset invite code');
    } finally {
      setIsResetting(false);
    }
  };

  const copyToClipboard = async (text: string, type: 'code' | 'link') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'code') {
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
      } else {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      }
      toast.success('Copied to clipboard!');
    } catch {
      toast.error('Failed to copy to clipboard');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Invite Members
          </DialogTitle>
          <DialogDescription>
            Invite people to join the "{workspaceName}" workspace
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {!inviteCode ? (
            <div className="text-center py-8">
              <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Generate Invite Link
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Create a shareable link to invite people to this workspace
              </p>
              <Button 
                onClick={generateInviteCode}
                disabled={isGenerating}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Link className="h-4 w-4 mr-2" />
                    Generate Invite Link
                  </>
                )}
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="invite-code">Invite Code</Label>
                <div className="flex gap-2">
                  <Input
                    id="invite-code"
                    value={inviteCode}
                    readOnly
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(inviteCode, 'code')}
                    className="px-3"
                  >
                    {copiedCode ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="invite-link">Invite Link</Label>
                <div className="flex gap-2">
                  <Input
                    id="invite-link"
                    value={inviteLink}
                    readOnly
                    className="flex-1 text-sm"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(inviteLink, 'link')}
                    className="px-3"
                  >
                    {copiedLink ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={resetInviteCode}
                  disabled={isResetting}
                  className="flex-1"
                >
                  {isResetting ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Resetting...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Reset Code
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => copyToClipboard(inviteLink, 'link')}
                  className="flex-1"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Link
                </Button>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>How to use:</strong> Share the invite link with people you want to invite. 
                  They'll need to be logged in to join the workspace.
                </p>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
